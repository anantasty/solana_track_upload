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
import TrackUpload from "./TrackUpload";
import Navbar from "./Navbar";
import { create, IPFS } from "ipfs-core";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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
    console.log("Connection to IPFS");
    (async () => {
      if (ipfsClient && ipfsClient?.isOnline()) {
        return;
      }
      const client = await create({ repo: "ok" + Math.random() });
      setIpfsClient(client);
    })();
    console.log(`ipfs_status: ${ipfsClient}`);
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} >
        <Grid item xs={12} className="bg-[#0f172a]">
          <Navbar />
        </Grid>
        <Grid item xs={12} className="bg-[#334155] p-5"> 
          <div className="" >
            <span className="button-wrapper">
              <WalletModalProvider>
                <WalletMultiButton />
              </WalletModalProvider>
            </span>
            {wallet.connected && <WalletDisconnectButton />}
          </div>
        </Grid>
        <Grid item xs={12} className="bg-[#334155] p-10">
          <TrackUpload
            ipfs={ipfsClient}
            connection={connection}
            wallet={wallet}
            program={program}
          />
        </Grid>
        <Grid item xs={12} className="bg-[#334155] p-10">
          <TracksView
            connection={connection}
            userKey={wallet.publicKey}
            client={ipfsClient}
            program={program}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
