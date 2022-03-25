import * as anchor from "@project-serum/anchor";
import { ProgramAccount, IdlTypes, AccountClient, Program } from "@project-serum/anchor";
import { IdlTypeDef } from "@project-serum/anchor/dist/cjs/idl";
import { TypeDef } from "@project-serum/anchor/dist/cjs/program/namespace/types";
import { Track } from "./track_model";
import idl  from './track_upload.json'

import { create, IPFS } from "ipfs-core";

const infura_browse = "https://ipfs.infura.io/ipfs";
const infura_url = { url: "https://ipfs.infura.io:5001" };

const projectId = '26kSkVGBv2Hpojs4LM2Jd97p799';
const projectSecret = '0df8688fa57a9a29392280b3423eca11';

const PROGRAM_ID = "Bou2Yfi3uVrHi1FxHuHcgYFa5Q5M4bSoXK3NHpZy8Zd6"


export interface TrackContract {
  id: anchor.web3.PublicKey,
  connection: anchor.web3.Connection;
  program: anchor.Program;
}


export interface TrackState {
  trackContract: TrackContract;
  allTracks: Track[];
  myTracks: Track[];
}

const get_infura_url = (cid:String) => {
    return `${infura_browse}/${cid}`;
};
const get_infura_link= async (path: String, client: IPFS) =>  {
    try{
    const links = []
    for await (const item of client.ls(String(path))){
        links.push(get_infura_url(item.cid.toString()))
    }
    return links
} catch (e) {
    return []
}
}
export const track_to_model = async(tracks: ProgramAccount[], client: IPFS): Promise<Track[]> => {
    const track_models: Track[] = []
    for (const track of tracks){
        const link_ = await get_infura_link(track.account.cid, client)
        const link = link_? link_: [get_infura_url(track.account.cid)]
        track_models.push(new Track(
            track.account.cid, 
            track.account.artist, 
            track.account.trackTitle,
            track.publicKey,
            link
            ))
    }
    return track_models
}

export const getTracks = async (
  connection: anchor.web3.Connection,    
  anchorWallet: anchor.Wallet,
  userKey?: anchor.web3.PublicKey| null,
): Promise<TrackState> => {
  const provider = new anchor.Provider(connection, anchorWallet, {
    preflightCommitment: "recent",
  });

  const chain_idl = await anchor.Program.fetchIdl(
    PROGRAM_ID,
    provider
  );
  let program: anchor.Program
try{
   program = new anchor.Program(chain_idl, PROGRAM_ID, provider);
   console.log(program)
} catch (e) {
    console.error("Error creating idl")
    console.error(e)
     program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID, provider);
}
  const trackContract: TrackContract = {
    id: new anchor.web3.PublicKey(PROGRAM_ID),
    connection,
    program,
  }
  const client = await create({repo: 'ok' + Math.random()})
    const myTracks = userKey? 
        await track_to_model(await program.account.track.all([{memcmp:{offset:8, bytes: userKey.toBase58()}}]), client)
        : null

    const allTracks = await track_to_model(await program.account.track.all(), client);
    client.stop()


  const trackState: TrackState = {
      trackContract,
    myTracks,
    allTracks

  }
  console.log(trackState)
  return trackState
}

