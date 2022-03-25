import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

import * as anchor from "@project-serum/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

import { TrackContract, TrackState, getTracks } from "./contract/interact_track";
import { IdlTypes, ProgramAccount } from "@project-serum/anchor";
import { IdlTypeDef } from "@project-serum/anchor/dist/cjs/idl";
import { TypeDef } from "@project-serum/anchor/dist/cjs/program/namespace/types";
import { Track } from "./contract/track_model";
import TrackCard from "./TrackCard";

export interface TrackViewProps {
    userKey: anchor.web3.PublicKey|null;
    connection: anchor.web3.Connection;
}

const TracksView = (props: TrackViewProps) => {
    const wallet = useAnchorWallet();
    const [myTracks, setMyTracks] = useState<Track[]|null>()
    const [allTracks, setAllTracks] = useState<Track[]|null>()    
    const [trackState, setTrackState] = useState<TrackState>()
    const [trackContract, setTrackContract] = useState<TrackContract>()
    const refreshTrackState = () => {
        (async () => {
            if (!wallet) return;
            console.log("user key")
            console.log(props.userKey)
            const trackState = await getTracks(props.connection, wallet as anchor.Wallet, props.userKey)
            if (trackState.myTracks){setMyTracks(trackState.myTracks)}
            setTrackState(trackState)
            setTrackContract(trackState.trackContract)
            setAllTracks(trackState.allTracks)
/*             const tracks = await allTracks.map(async t=> {t.link=await t.get_infura_link(); return t}) */

        })();
    }

    useEffect(refreshTrackState, [wallet, props.userKey, props.connection]);

    return (
    <main style={{position: 'relative'}}>
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        minHeight: 100,
      }}
      >
          <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <TrackCard tracks={allTracks}></TrackCard>
          </div>
      </div>        
    </main>
    );

}
export default TracksView