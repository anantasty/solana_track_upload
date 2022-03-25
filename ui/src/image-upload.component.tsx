import { IPFS } from "ipfs-core";
import React, { useState } from "react";
import {FormControl, InputGroup} from 'react-bootstrap';
import * as anchor from "@project-serum/anchor";
import { useAnchorWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { create_dag, uploadToIpfs, writeToChain } from "./contract/interact_track";
import { Program } from "@project-serum/anchor";

export interface UploadProps {
  ipfs: IPFS
  connection: anchor.web3.Connection
  wallet: WalletContextState
  program: Program
}

const UploadImages = (props: UploadProps) => {
  const anchorWallet = useAnchorWallet();
  const [currentFile, setCurrentFile] = useState<File|null>();
  const [previewImage, setPreviewImage] = useState()
  const [progress, setProgress] = useState(0)
  const [message, setMessages] = useState("")
  const [cid, setCid] = useState<String>()
  const [artist, setArtist] = useState("")
  const [title, setTitle] = useState("")
  const [tx, setTx] = useState("")
  const [track, setTrack] = useState("")

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0])
    setPreviewImage(event.target.files[0])
    setProgress(0)
    setMessages("")
  }

  const upload = async (event) => {
    if (!props.ipfs) {
      setMessages(`NOT READY ${props.ipfs} - ${props.ipfs?.isOnline()}`); 
      return
    }
    setMessages("attempting upload")
    setProgress(10)
    try{
      const result = await uploadToIpfs(currentFile, props.ipfs)
      setCid(result.cid.toString())
      setMessages(result.cid.toString())
      setProgress(100)      
    } catch (e) {
      setMessages(`Error: ${e}`)
      setProgress(0)
    }
  } 

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
    )
    const tx = await writeToChain(
      props.program,      
      dag_cid,
      track,
      anchorWallet as anchor.Wallet,
      props.wallet,
      props.connection,
      artist,
      title
    )
    setTx(tx)
    setTrack(track.publicKey.toString())
  }

    return (
      <>
        <div className="row">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input type="file" accept="image/*" onChange={selectFile} />
            </label>
          </div>

          <div className="col-4">
            <button
              className="btn btn-success btn-sm"
              disabled={!currentFile}
              onClick={upload}
            >
              Upload
            </button>
            <button
              className="btn btn-success btn-sm"
              disabled={!cid || !(title && artist)}
              onClick={publish}
            >
              Publish
            </button>            
          </div>
        </div>

        {currentFile && (
          <div className="progress my-3">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
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
          <div>
            <img className="preview" src={URL.createObjectURL(previewImage)} alt="" />
          </div>
        )}

        <InputGroup size="sm" className="mb-3 mt-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Title</InputGroup.Text>
          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={(e)=>setTitle(e.currentTarget.value)}/>
        </InputGroup>
        <InputGroup size="sm" className="mb-3 mt-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Artist</InputGroup.Text>
          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={artist} onChange={(e)=> {setArtist(e.currentTarget.value)}}/>
        </InputGroup>

        {message && (
          <div className="alert alert-secondary mt-3" role="alert">
            {message}
          </div> 
        )}
        {tx && (
          <div className="alert alert-secondary mt-4">
            <p>Success: {tx} </p>
            <p>Track: {track}</p>
          </div>
        )}
      </>
    );
}

export default UploadImages;