import UploadImages, { UploadProps } from "./image-upload.component";

const TrackUpload = (props: UploadProps) => {
  return (
    <div className="upload-track">
      <UploadImages
        ipfs={props.ipfs}
        connection={props.connection}
        wallet={props.wallet}
        program={props.program}
      />
    </div>
  );
};

export default TrackUpload;
