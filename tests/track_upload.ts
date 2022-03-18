import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { TrackUpload } from "../target/types/track_upload";
import fs from 'fs';
import { IPFS, create } from 'ipfs-core';
import type { CID } from 'ipfs-core';
import * as assert from "assert";

const program = anchor.workspace.TrackUpload as Program<TrackUpload>;
const creator = program.provider.wallet;
const track = anchor.web3.Keypair.generate();

describe("track_upload", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());


  const cid = "QmPvAuVdiqteJF82w13sjhjqb4YNSBKohmpiv3G9FoBz22";
  const artist = "Beatles";
  const track_title = "Yellow Submarine";
  it("Is initialized!", async () => {
    const tx = await program.rpc.initialize( 
      cid,
      artist,
      track_title,
      {
      accounts: {
        creator: creator.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        track: track.publicKey,
      },
      signers:[track]
    });
    console.log("Your transaction signature", tx);
    console.log(`Track Key: ${track.publicKey}`);
    console.log(`SIGNER: ${creator.publicKey}`);
  });
  it("Should match artist, track and cid", async () => {
    let trackState = await program.account.track.fetch(track.publicKey);
    assert.equal(`${trackState.artist}`, artist);
    assert.equal(`${trackState.cid}`, cid);
    assert.equal(`${trackState.trackTitle}`, track_title);  
    console.log(`TRACK: ${trackState.artist}, ${trackState.cid}, ${trackState.trackTitle} `)  
  });
});

const new_cid = "QmPvAuVdiqteJF82w13sjhjqb4YNSBKohmpiv3G9FoBz22";
const new_artist = "BEATLES";
const new_title = "Yellow Sub"
describe("track_update",  () => {
  it("Updates", async () => {
    let trackState = await program.account.track.fetch(track.publicKey);
    const tx = await program.rpc.update(
      new_cid,
      new_artist,
      new_title,
      {
        accounts: {
          track: track.publicKey,
          signer: creator.publicKey
        },
        signers: creator instanceof (anchor.Wallet as any) ? [] : [creator]
    }
   );
   
  });
  it("Should match updated track, title and cid", async () => {
  let trackState2 = await program.account.track.fetch(track.publicKey);
   assert.equal(`${trackState2.artist}`, new_artist);
   assert.equal(`${trackState2.cid}`, new_cid);
   assert.equal(`${trackState2.trackTitle}`, new_title);
   console.log(`TRACK: ${trackState2.artist}, ${trackState2.cid}, ${trackState2.trackTitle} `)   
  });
})

