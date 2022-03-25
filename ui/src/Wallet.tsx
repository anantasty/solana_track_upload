import React, { useEffect, useState } from 'react';

import {
    useAnchorWallet,
    useConnection,
    useWallet,
} from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import TracksView from './TracksView';
import TrackUpload from './TrackUpload';
import { create, IPFS } from "ipfs-core";

import * as anchor from "@project-serum/anchor";
import { ProgramAccount, Program } from "@project-serum/anchor";
const PROGRAM_ID = "Bou2Yfi3uVrHi1FxHuHcgYFa5Q5M4bSoXK3NHpZy8Zd6"
const Wallet: React.FC = () => {
    const { connection } = useConnection();
    const anchorWallet = useAnchorWallet();
    const [ipfsClient, setIpfsClient ]= useState<IPFS>()
    const [program, setProgram] = useState<Program>()
    let walletAddress = "";
    const ipfsClientCreate = () => {
        console.log("Connection to IPFS");
        (async () => {
            if (ipfsClient && ipfsClient?.isOnline()) {return}
            const client = await create();
            setIpfsClient(client)
        })();
        console.log(`ipfs_status: ${ipfsClient}`)
    }
    const programCreate = () => {
    (async () => {
        const provider = new anchor.Provider(connection, anchorWallet, {
            preflightCommitment: "recent",
          });
        
          const chain_idl = await anchor.Program.fetchIdl(
            PROGRAM_ID,
            provider
          );
          const program = new anchor.Program(chain_idl, PROGRAM_ID, provider);
          setProgram(program);
    })();}
    useEffect(ipfsClientCreate, [ipfsClient])
    useEffect(programCreate, [anchorWallet, connection])
    // if you use anchor, use the anchor hook instead
    // const wallet = useAnchorWallet();
    // const walletAddress = wallet?.publicKey.toString();

    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
    }

    return (
        <>
            <div className="header-wrapper">
                <span className="button-wrapper">
                    <WalletModalProvider>
                        <WalletMultiButton />
                    </WalletModalProvider>
                </span>
                {wallet.connected && <WalletDisconnectButton />}
            </div>
            <div className='track-upload'>
                <TrackUpload ipfs={ipfsClient} connection={connection} wallet={wallet} program={program}/>
            </div>
            <div>
                <TracksView connection={connection} userKey={wallet.publicKey} client={ipfsClient} program={program}></TracksView> 
            </div>
        </>
    );
};

export default Wallet;
