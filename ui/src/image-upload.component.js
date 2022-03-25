import React, { Component } from "react";
import {FormControl, FormGroup, ControlLabel, InputGroup} from 'react-bootstrap';

export default class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      currentFile: undefined,
      previewImage: undefined,
      progress: 0,
      message: "",
      imageInfos: [],
    };
  }

  selectFile(event) {
    this.setState({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      message: ""
    });
  }

  upload() {
    this.setState({
      progress: 0,
    });
  }  
  render() {
    const {
      currentFile,
      previewImage,
      progress,
      message,
      imageInfos,
    } = this.state;

    return (
      <>
        <div className="row">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input type="file" accept="image/*" onChange={this.selectFile} />
            </label>
          </div>

          <div className="col-4">
            <button
              className="btn btn-success btn-sm"
              disabled={!currentFile}
              onClick={this.upload}
            >
              Upload
            </button>
          </div>
        </div>

        {currentFile && (
          <div className="progress my-3">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        {previewImage && (
          <div>
            <img className="preview" src={previewImage} alt="" />
          </div>
        )}

        <InputGroup size="sm" className="mb-3 mt-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Title</InputGroup.Text>
          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
        <InputGroup size="sm" className="mb-3 mt-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Artist</InputGroup.Text>
          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>

        {message && (
          <div className="alert alert-secondary mt-3" role="alert">
            {message}
          </div> 
        )}
      </>
    );
  }
}
