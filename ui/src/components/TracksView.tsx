import { useEffect, useState } from "react";

import * as anchor from "@project-serum/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

import {
  TrackContract,
  TrackState,
  getTracks,
} from "../contract/interact_track";
import { Track } from "../contract/track_model";
import TrackCard from "./TrackCard";
import { IPFS } from "ipfs-core";
import { Program } from "@project-serum/anchor";

export interface TrackViewProps {
  program: Program;
  userKey: anchor.web3.PublicKey | null;
  connection: anchor.web3.Connection;
  client: IPFS;
  wallet: any;
}

const TracksView = (props: TrackViewProps) => {
  // const wallet = useAnchorWallet();
  const wallet = props.wallet;
  const [myTracks, setMyTracks] = useState<Track[] | null>();
  const [allTracks, setAllTracks] = useState<Track[] | null>();
  const [trackState, setTrackState] = useState<TrackState>();
  const [trackContract, setTrackContract] = useState<TrackContract>();
  const refreshTrackState = () => {
    (async () => {
      if (!wallet || !props.client) return;
      const trackState = await getTracks(
        props.program,
        props.connection,
        wallet as anchor.Wallet,
        wallet.publicKey,
        props.client
        );
        console.log('tracksView123=>', trackState );
      if (trackState.myTracks) {
        setMyTracks(trackState.myTracks);
      }
      setTrackState(trackState);
      setTrackContract(trackState.trackContract);
      setAllTracks(trackState.allTracks);
      /*             const tracks = await allTracks.map(async t=> {t.link=await t.get_infura_link(); return t}) */
    })();
  };

  useEffect(refreshTrackState, [
    props.program,
    wallet,
    props.userKey,
    props.connection,
    props.client,
  ]);
  props.program?.addEventListener("TrackEvent", (event, slot) => {
    console.log(`event: ${event}, slot: ${slot}`);
    console.log(event);
  });
  return (
    <main style={{ position: "relative" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TrackCard tracks={myTracks} client={props.client}></TrackCard>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          minHeight: 100,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TrackCard tracks={allTracks} client={props.client}></TrackCard>
        </div>
      </div>
    </main>
  );
};
export default TracksView;
