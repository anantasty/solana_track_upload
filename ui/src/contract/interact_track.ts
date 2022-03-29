import * as anchor from "@project-serum/anchor";
import { ProgramAccount, Program } from "@project-serum/anchor";
import { Track } from "./track_model";

import { create, IPFS, CID } from "ipfs-core";
import { WalletContextState } from "@solana/wallet-adapter-react";
import React from "react";

const infura_browse = "https://ipfs.infura.io/ipfs";
const PROGRAM_ID = "6yT4AFpityTwxz7AdVrSJTckGyPyrXL8MKuutmBbDTnj";

export interface TrackContract {
  id: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  program: anchor.Program;
}

export interface TrackState {
  trackContract: TrackContract;
  allTracks: Track[];
  myTracks: Track[];
}

export const get_infura_url = (cid: String) => {
  return `${infura_browse}/${cid}`;
};
export const get_infura_link = async (path: String, client: IPFS): Promise<String[]> => {
  const result = [];
  try {
    const dag = await client.dag.get(CID.parse(path as string));
    result.push(get_infura_url(`${dag.value.cid}/${dag.value.file}`));
  } catch (e) {
    result.push(e.toString());
  }
  return result;
};
export const track_to_model = async (
  tracks: ProgramAccount[],
  client: IPFS
): Promise<Track[]> => {
  const track_models: Track[] = [];
  for (const track of tracks) {
    track_models.push(
      new Track(
        track.account.cid,
        track.account.artist,
        track.account.trackTitle,
        track.publicKey,
      )
    );
  }
  return track_models;
};

export const uploadToIpfs = async (file: File, ipfs: IPFS, setProgress?:React.Dispatch<number>) => {
  let client: IPFS;
  const options = { wrapWithDirectory: true }
  if (setProgress) {options["progress"] = (prog) => setProgress((prog/file.size)*100)}
  if (ipfs && ipfs?.isOnline()) {
    client = ipfs;
  } else client = await create();
  return client.add(
    { content: file, path: file.name },
    options
  );
};

export const create_dag = async (
  node: IPFS,
  cid: String,
  path: String,
  track: String = "",
  user: String = "",
  artist: String = "",
  title: String = "",
  media_type: String = "image"
) => {
  const dag_cid = await node.dag.put(
    {
      cid: CID.parse(cid as string),
      file: path,
      user: user,
      track: track,
      artist: artist,
      title: title,
      media_type: media_type,
      timestamp: new Date().getTime(),
    },
    { pin: true }
  );
  //node.stop()
  return dag_cid.toString();
};

export const writeToChain = async (
  program: Program,
  cid: String,
  track: anchor.web3.Keypair,
  wallet: anchor.Wallet,
  signer: WalletContextState,
  connection: anchor.web3.Connection,
  artist?: String,
  title?: String
) => {
  const tx = await program.rpc.initialize(cid, artist, title, {
    accounts: {
      signer: signer.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
      track: track.publicKey,
    },
    signers: [track],
  });
  return tx;
};
export const getTracks = async (
  program: Program,
  connection: anchor.web3.Connection,
  anchorWallet: anchor.Wallet,
  userKey?: anchor.web3.PublicKey | null,
  client?: IPFS
): Promise<TrackState> => {
  console.log('interact_tack=>', connection, program, userKey);
  const trackContract: TrackContract = {
    id: new anchor.web3.PublicKey(PROGRAM_ID),
    connection,
    program,
  };
  const myTracks = userKey
    ? await track_to_model(
        await (
          await program.account.track.all([
            { memcmp: { offset: 8, bytes: userKey.toBase58() } },
          ])
        ).slice(0, 5),
        client
      )
    : null;

  const allTracks = await track_to_model(
    await program.account.track.all(),
    client
  );
  //client.stop()

  const trackState: TrackState = {
    trackContract,
    myTracks,
    allTracks,
  };
  return trackState;
};
