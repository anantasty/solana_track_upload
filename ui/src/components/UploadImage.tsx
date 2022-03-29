<<<<<<< HEAD
import { IPFS } from "ipfs-core";
import React, { useState } from "react";
import * as anchor from "@project-serum/anchor";
import {
  useAnchorWallet,
  WalletContextState,
} from "@solana/wallet-adapter-react";
import {
  create_dag,
  uploadToIpfs,
  writeToChain,
} from "../contract/interact_track";
import { Program } from "@project-serum/anchor";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';



export interface UploadProps {
  ipfs: IPFS;
  connection: anchor.web3.Connection;
  wallet: WalletContextState;
  program: Program;
}

const UploadImage = (props: UploadProps) => {
  const anchorWallet = useAnchorWallet();
  const [currentFile, setCurrentFile] = useState<File | null>();
  const [previewImage, setPreviewImage] = useState();
  const [progress, setProgress] = useState(0);
  const [message, setMessages] = useState("");
  const [cid, setCid] = useState<String>();
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [tx, setTx] = useState("");
  const [track, setTrack] = useState("");

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(event.target.files[0]);
    setProgress(0);
    setMessages("");
  };

  const upload = async (event) => {
    if (!props.ipfs) {
      setMessages(`NOT READY ${props.ipfs} - ${props.ipfs?.isOnline()}`);
      return;
    }
    setMessages("attempting upload");
    setProgress(10);
    try {
      const result = await uploadToIpfs(currentFile, props.ipfs, setProgress);
      setCid(result.cid.toString());
      setProgress(100)
      setMessages(result.cid.toString());
    } catch (e) {
      setMessages(`Error: ${e}`);
      setProgress(0);
    }
  };

  const publish = async (event) => {
    const track = anchor.web3.Keypair.generate();
    const dag_cid = await create_dag(
      props.ipfs,
      cid,
      currentFile.name,
      track.publicKey.toString(),
      props.wallet.publicKey.toString(),
      artist,
      title
    );
    const tx = await writeToChain(
      props.program,
      dag_cid,
      track,
      anchorWallet as anchor.Wallet,
      props.wallet,
      props.connection,
      artist,
      title
    );
    setTx(tx);
    setTrack(track.publicKey.toString());
  };

  return (
    <Card sx={{ maxWidth: 550, margin: "auto", borderRadius: "10px", padding: "50px"}}>
      <div className="flex flex-nowrap">
        <div className="basis-3/5">
          <label className="btn btn-default p-0">
            <input type="file" accept="image/*,video/*" onChange={selectFile} />
          </label>
        </div>

        <div className="basis-2/5">
          <button
            className="bg-[#198754] text-white m-1 p-1 rounded-md"
            disabled={!currentFile}
            onClick={upload}
          >
            Upload
          </button>
          <button
            className="bg-[#198754] text-white m-1 p-1 rounded-md"
            disabled={!cid || !(title && artist)}
            onClick={publish}
          >
            Publish
          </button>
        </div>
      </div>

      {currentFile && (
        <div className="flex my-3 h-4 bg-[#e9ecef] rounded-lg text-xs ">
          <div
            className="flex-col justify-center rounded-md text-white text-center truncate bg-[#0d6efd] transition duration-150 ease-out md:ease-in"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}

      {previewImage && (
        <div className="flex flex-col items-center">
          <img  className="w-24" src={URL.createObjectURL(previewImage)} alt="" />
        </div>
      )}
      
      <div className="mt-3">
        <TextField fullWidth label="Title" id="title" onChange={(e) => setTitle(e.currentTarget.value)} />
      </div>
      <div className="mt-3">
        <TextField fullWidth label="Artist" id="artist" onChange={(e) => setTitle(e.currentTarget.value)} />
      </div>
      
      {message && (
        <div className="bg-[#e2e3e5] text-[#41464b] border-[#d3d6d8] p-1 mt-3 border border-solid  mb-1 raounded-md" role="alert">
          {message}
        </div>
      )}
      {tx && (
        <div className="alert alert-secondary mt-4">
          <p>Track: {track}</p>
          <img
            className="preview"
            src={URL.createObjectURL(previewImage)}
            alt=""
          />
        </div>
      )}
    </Card>
  );
};

export default UploadImage;
=======
import { IPFS } from "ipfs-core";
import React, { useState } from "react";
import * as anchor from "@project-serum/anchor";
import {
  useAnchorWallet,
  WalletContextState,
} from "@solana/wallet-adapter-react";
import {
  create_dag,
  uploadToIpfs,
  writeToChain,
} from "../contract/interact_track";
import { Program } from "@project-serum/anchor";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';



export interface UploadProps {
  ipfs: IPFS;
  connection: anchor.web3.Connection;
  wallet: WalletContextState;
  program: Program;
}

const UploadImage = (props: UploadProps) => {
  const anchorWallet = useAnchorWallet();
  const [currentFile, setCurrentFile] = useState<File | null>();
  const [previewImage, setPreviewImage] = useState();
  const [progress, setProgress] = useState(0);
  const [message, setMessages] = useState("");
  const [cid, setCid] = useState<String>();
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [tx, setTx] = useState("");
  const [track, setTrack] = useState("");

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(event.target.files[0]);
    setProgress(0);
    setMessages("");
  };

  const upload = async (event) => {
    if (!props.ipfs) {
      setMessages(`NOT READY ${props.ipfs} - ${props.ipfs?.isOnline()}`);
      return;
    }
    setMessages("attempting upload");
    setProgress(10);
    try {
      const result = await uploadToIpfs(currentFile, props.ipfs);
      setCid(result.cid.toString());
      setMessages(result.cid.toString());
      setProgress(100);
    } catch (e) {
      setMessages(`Error: ${e}`);
      setProgress(0);
    }
  };

  const publish = async (event) => {
    const track = anchor.web3.Keypair.generate();
    const dag_cid = await create_dag(
      props.ipfs,
      cid,
      currentFile.name,
      track.publicKey.toString(),
      props.wallet.publicKey.toString(),
      artist,
      title
    );
    const tx = await writeToChain(
      props.program,
      dag_cid,
      track,
      anchorWallet as anchor.Wallet,
      props.wallet,
      props.connection,
      artist,
      title
    );
    setTx(tx);
    setTrack(track.publicKey.toString());
  };

  return (
    <Card sx={{ maxWidth: 550, margin: "auto", borderRadius: "10px", padding: "50px"}}>
      <div className="flex flex-nowrap">
        <div className="basis-3/5">
          <label className="btn btn-default p-0">
            <input type="file" accept="image/*,video/*" onChange={selectFile} />
          </label>
        </div>

        <div className="basis-2/5">
          <button
            className="bg-[#198754] text-white m-1 p-1 rounded-md"
            disabled={!currentFile}
            onClick={upload}
          >
            Upload
          </button>
          <button
            className="bg-[#198754] text-white m-1 p-1 rounded-md"
            disabled={!cid || !(title && artist)}
            onClick={publish}
          >
            Publish
          </button>
        </div>
      </div>

      {currentFile && (
        <div className="flex my-3 h-4 bg-[#e9ecef] rounded-lg text-xs ">
          <div
            className="flex-col justify-center rounded-md text-white text-center truncate bg-[#0d6efd] transition duration-150 ease-out md:ease-in"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}

      {previewImage && (
        <div className="flex flex-col items-center">
          <img  className="w-24" src={URL.createObjectURL(previewImage)} alt="" />
        </div>
      )}
      
      <div className="mt-3">
        <TextField fullWidth label="Title" id="title" onChange={(e) => setTitle(e.currentTarget.value)} />
      </div>
      <div className="mt-3">
        <TextField fullWidth label="Artist" id="artist" onChange={(e) => setTitle(e.currentTarget.value)} />
      </div>
      
      {message && (
        <div className="bg-[#e2e3e5] text-[#41464b] border-[#d3d6d8] p-1 mt-3 border border-solid  mb-1 raounded-md" role="alert">
          {message}
        </div>
      )}
      {tx && (
        <div className="alert alert-secondary mt-4">
          <p>Track: {track}</p>
          <img
            className="preview"
            src={URL.createObjectURL(previewImage)}
            alt=""
          />
        </div>
      )}
    </Card>
  );
};

export default UploadImage;
>>>>>>> WebGenius912-WebGenius912
