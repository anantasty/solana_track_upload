import React, { useEffect, useMemo, useState } from "react";
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
import { create, IPFS } from "ipfs-core";

import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { useDispatch, useStore } from "react-redux";
import { setWalletAddress } from "../store/auth/action";

const WalletSub: React.FC = () => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  
  const wallet = useWallet();
  let walletAddress = undefined;
  if (wallet.connected && wallet.publicKey) {
      walletAddress = wallet.publicKey;
  }
  const walletInfo = useMemo(() => ({
    wallet: wallet,
    walletAddress: wallet.publicKey,
    connection: connection,
  }),[wallet, connection]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(anchorWallet && walletAddress) {
      dispatch(setWalletAddress(walletInfo));
    }
  }, [walletInfo, anchorWallet, walletAddress, dispatch])
    // const [ipfsClient, setIpfsClient] = useState<IPFS>();
    // const [program, setProgram] = useState<Program>();
    // const ipfsClientCreate = () => {
    //     (async () => {
    //     if (ipfsClient && ipfsClient?.isOnline()) {
    //         return;
    //     }
    //     const client = await create({ repo: "ok" + Math.random() });
    //     setIpfsClient(client);
    //     })();
    // };
    // const programCreate = () => {
    //     (async () => {
    //       console.log('suvwallet-programcreate', anchorWallet);
    //     const provider = new anchor.Provider(connection, anchorWallet, {
    //         preflightCommitment: "recent",
    //     });

    //     const chain_idl = await anchor.Program.fetchIdl(PROGRAM_ID, provider);
    //     const program = new anchor.Program(chain_idl, PROGRAM_ID, provider);
    //     setProgram(program);
    //     })();
    // };
    // useEffect(ipfsClientCreate, [ipfsClient]);
    // useEffect(programCreate, [anchorWallet, connection]);
    // if you use anchor, use the anchor hook instead
    // const wallet = useAnchorWallet();
    // const walletAddress = wallet?.publicKey.toString();

  // console.log('wallettype=>', anchorWallet);
    

  return (
    <div className="" >
        <span className="button-wrapper">
            <WalletModalProvider>
            <WalletMultiButton />
            </WalletModalProvider>
        </span>
        {wallet.connected && <WalletDisconnectButton />}
    </div>
  );
};

export default WalletSub;
