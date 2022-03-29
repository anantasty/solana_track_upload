import { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import {
  Program, Provider, web3
} from '@project-serum/anchor';
import UploadImages from './image-upload.component';

const TrackUpload = () => {
  const [value, setValue] = useState(null);
  
    return (
      <div className="upload-track">
        <UploadImages />
      </div>
    );
}

export default TrackUpload;