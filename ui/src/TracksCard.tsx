import { set } from "@project-serum/anchor/dist/cjs/utils/features";
import { Key, useEffect, useState } from "react";
import { Track } from "./contract/track_model"

interface TrackProps{
    tracks: Track[]
}
const TracksCard = (props: TrackProps) => {
    return (
        <main style={{position: 'relative', justifyContent: 'left'}}>
            {props.tracks && props.tracks.map((track)=> {
                const link = track.extra? track.extra[0] as string: track.get_infura_url()
                return (
                    <div 
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        minHeight: 100,
                      }}
                    key={track.key.toString() as Key}>
                        <div style={{width: '80%', 
                        cursor: 'pointer', 
                        margin: 20, 
                        backgroundColor: 'rgba(50, 50, 0, 0.5)'}}>
                        <p>Title: {track.title}</p>
                        <p>Artist: {track.artist}</p>
                        <p>Key: {track.key.toString()}</p>
                        <img src={link} alt={link}></img>
                        </div>
                    </div>
                )
            })}
        </main>
    );
}

export default TracksCard