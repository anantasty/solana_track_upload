import { set } from "@project-serum/anchor/dist/cjs/utils/features";
import { Key, useEffect, useState } from "react";

import { Track } from "./contract/track_model";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import { IPFS } from "ipfs-core";
import { get_infura_link } from "./contract/interact_track";
import CircularProgress from "@material-ui/core/CircularProgress";

interface TrackProps {
  tracks: Track[];
  client: IPFS;
}
const TrackCard = (props: TrackProps) => {
  const [stateMap, setStateMap] = useState(new Map<String,String[]>());
  const [stateTrigger, setStateTrigger] = useState(Math.random());
  const populateLinks = () => {
    console.log("adding links");
    (async () => {
      if (!props.tracks) {
        return;
      }
      for (const track of props.tracks) {
        const link = (stateMap && stateMap.get(track.cid))?stateMap.get(track.cid) : await get_infura_link(track.cid, props.client);
        stateMap.set(track.cid, link)
        track.extra = link;
        setStateMap(stateMap);
        setStateTrigger(Math.random());
      }
    })();
    console.log("set state");
  };
  useEffect(populateLinks, [props.client, props.tracks]);
  return (
    <main key={stateTrigger}>
      <div className={`card mt-3 p-5 ${props.tracks ? "" : "d-none"}`}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {props.tracks &&
            props.tracks.map((track, index) => {
              const link = track.extra ? (track.extra[0] as string) : null;
              return (
                <Grid item xs={4} sm={4} md={4} key={index}>
                  <Card
                    sx={{ maxWidth: 345, margin: "auto", borderRadius: "10px" }}
                  >
                    {link ? (
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        key={Date.now()}
                        image={link}
                      />
                    ) : (
                      <div>
                        <CircularProgress color="secondary" />
                      </div>
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {track.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{
                          padding: "5px",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >
                        {track.artist}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ padding: "5px", fontWeight: "bold" }}
                      >
                        {track.cid}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </main>
  );
};

export default TrackCard;

