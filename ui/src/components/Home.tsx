import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
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
import Upload from "./Upload";
import Headerbar from "./HeaderBar";
import Sidebar from "./Sidebar";
import Wallet from "./Wallet";

import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import { create, IPFS } from "ipfs-core";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";

const PROGRAM_ID = "Bou2Yfi3uVrHi1FxHuHcgYFa5Q5M4bSoXK3NHpZy8Zd6";
const Home: React.FC = () => {
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0} >
        <Grid item xs={12} className="bg-[#0f172a] p-1">
          <Headerbar />
        </Grid>
        <Grid item xs={2} className="bg-white h-screen">
          <Sidebar />
        </Grid>
        {/* <Grid item xs={12} className="bg-[#334155] h-1000 p-5"> 
          <div className="" >
            <span className="button-wrapper">
              <WalletModalProvider>
                <WalletMultiButton />
              </WalletModalProvider>
            </span>
            {wallet.connected && <WalletDisconnectButton />}
          </div>
        </Grid> */}
        <Grid item xs={10} className="bg-[#334155] p-10">
          {/* <Routes> */}
          {/* <Route path="/upload" element={<Wallet />}/> */}
            {/* <Route path="/upload" element={<TrackUpload ipfs={ipfsClient} connection={connection} wallet={wallet} program={program}/>}/> */}
            {/* <Route path="/allimage" element={<TracksView userKey={wallet.publicKey} connection={connection} client={ipfsClient} program={program}/>}/> */}
          {/* </Routes> */}
          <Upload
            ipfs={ipfsClient}
            connection={connection}
            wallet={wallet}
            program={program}
          />
        </Grid>
        <Grid item xs={12} className="bg-[#334155] p-10">
          {/* <TracksView
            connection={connection}
            userKey={wallet.publicKey}
            client={ipfsClient}
            program={program}
          /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
