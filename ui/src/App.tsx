import React from "react";
import { Routes, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import "./App.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
  getTorusWallet,
} from "@solana/wallet-adapter-wallets";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { clusterApiUrl } from "@solana/web3.js";
import Home from "./components/Home";
import Headerbar from "./components/HeaderBar";
import Sidebar from "./components/Sidebar";
import TracksView from "./components/TracksView";
import TrackUpload from "./components/TrackUpload";
import AllTrack from "./components/AllTrack";
import MyTrack from "./components/MyTrack";
import Wallet from "./components/Wallet";
import { ApplicationState } from "./store";
import { History } from "history";

interface ComponentProps {
  store: ApplicationState | any;
  history: History;
}

const App: React.FC = () => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = React.useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getLedgerWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <Box sx={{ flexGrow: 0 }}>
          <Grid container spacing={0}>
            <Grid item xs={12} className="bg-[#0f172a] p-1">
              <Headerbar />
            </Grid>
            <Grid item xs={2} className="bg-white h-screen">
              <Sidebar />
            </Grid>
            <Grid item xs={10} className="bg-[#334155] p-10">
              <Routes>
                <Route path="/alltrack" element={<AllTrack />} />
                <Route path="/mytrack" element={<MyTrack />} />
                <Route path="/trackupload" element={<TrackUpload />} />
              </Routes>
            </Grid>
          </Grid>
        </Box>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
