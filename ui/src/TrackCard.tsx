import { set } from "@project-serum/anchor/dist/cjs/utils/features";
import { Key, useEffect, useState } from "react";
import { Track } from "./contract/track_model"

interface TrackProps{
    tracks: Track[]
}
const TrackCard = (props: TrackProps) => {
    return (
        <main>
            {props.tracks && props.tracks.map((track)=> {
                const link = track.extra? track.extra[0] as string: track.get_infura_url()
                return (
                    <div key={track.key.toString() as Key}>
                        <p>Title: {track.title}</p>
                        <p>Artist: {track.artist}</p>
                        <p>CID: {track.cid}</p>
                        <a href={link}>Image</a>
                        <img src={link} alt={link}></img>
                    </div>
                )
            })}
        </main>
    );
}

export default TrackCard
