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
import TracksView from "./TracksView";

import { create, IPFS } from "ipfs-core";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { useSelector } from "react-redux";
import { ApplicationState } from '../store';

const PROGRAM_ID = "Bou2Yfi3uVrHi1FxHuHcgYFa5Q5M4bSoXK3NHpZy8Zd6";

const AllTrack: React.FC = () => {
    const walletInfos = useSelector((state: ApplicationState) => state.auth.walletInfo);
    console.log('wallet address in all track = ', walletInfos);
    // if(walletInfos) {
        
    // }
    const connection = walletInfos.connection;
    const anchorWallet = walletInfos.anchorWallet;
    const walletAddress = walletInfos.walletAddress;

    const [ipfsClient, setIpfsClient] = useState<IPFS>();
    const [program, setProgram] = useState<Program>();
    
    
    // let walletAddress = "";
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
            console.log('alltrack anchorwalllet', anchorWallet);
        const provider = new anchor.Provider(connection, anchorWallet, {
            preflightCommitment: "recent",
        });
        console.log('provideralltrack=>', provider);
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

    // const wallet = useWallet();
    // if (wallet.connected && wallet.publicKey) {
    //     walletAddress = wallet.publicKey.toString();
    //     console.log('connectedwalletAddress1233542354alltrack=>', walletAddress);
    // }
    

    if(anchorWallet) {
        console.log('userKey=>', walletAddress);
        console.log('program=>', program);
        console.log('connection=>', connection);
        console.log('ipfsClient=>', ipfsClient);
        return (
            // <div>here is all tracks</div>
            <TracksView
                connection={connection}
                userKey={walletAddress}
                client={ipfsClient}
                program={program}
                wallet={anchorWallet}
            />        
        )
    } else {
        return (
            <div className="text-white">
                <h3>please connect wallet</h3>
            </div>
        )
    }  
      
}

export default AllTrack;

