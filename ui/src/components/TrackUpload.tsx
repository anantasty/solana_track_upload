import React, { useEffect, useState } from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Upload from "./Upload"

import { create, IPFS } from "ipfs-core";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";

const PROGRAM_ID = "Bou2Yfi3uVrHi1FxHuHcgYFa5Q5M4bSoXK3NHpZy8Zd6";

const TrackUpload: React.FC = () => {
    const { connection } = useConnection();
    const anchorWallet = useAnchorWallet();

    const [ipfsClient, setIpfsClient] = useState<IPFS>();
    const [program, setProgram] = useState<Program>();
    let walletAddress = "";
    const ipfsClientCreate = () => {
        (async () => {
        if (ipfsClient && ipfsClient?.isOnline()) {
            return;
        }
        const client = await create({ repo: "ok" + Math.random() });
        setIpfsClient(client);
        })();
    };
    const programCreate = () => {
        (async () => {
        const provider = new anchor.Provider(connection, anchorWallet, {
            preflightCommitment: "recent",
        });

        const chain_idl = await anchor.Program.fetchIdl(PROGRAM_ID, provider);
        const program = new anchor.Program(chain_idl, PROGRAM_ID, provider);
        setProgram(program);
        })();
    };
    useEffect(ipfsClientCreate, [ipfsClient]);
    useEffect(programCreate, [anchorWallet, connection]);
    // if you use anchor, use the anchor hook instead
    // const wallet = useAnchorWallet();
    // const walletAddress = wallet?.publicKey.toString();

    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString();
    }

    return (
      <Upload
        ipfs={ipfsClient}
        connection={connection}
        wallet={wallet}
        program={program}
      />
    );

  //   if(anchorWallet) {
  //     console.log('anchorWallet-UploadTrack=>', anchorWallet)
  //     return (
  //         <div>here is all tracks</div>
  //         // <TracksView
  //         //     connection={connection}
  //         //     userKey={wallet.publicKey}
  //         //     client={ipfsClient}
  //         //     program={program}
  //         // />        
  //     )
  //   } else {
  //     return (
  //         <div className="text-white">
  //             <h3>Here is uploadTrack = please connect wallet</h3>
  //         </div>
  //     )
  // }  
}

export default TrackUpload;

