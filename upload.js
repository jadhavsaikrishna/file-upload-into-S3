import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import generateSignedUrl from "./generatesignurl";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = async (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    const signedUrl = await generateSignedUrl(selectedFile.name);

    setFile(selectedFile);

    const options = {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(progress);
      }
    };

    await axios.put(signedUrl, selectedFile, options);
  };

  return (
    <div>
      <Dropzone onDrop={onDrop} accept=".mp4">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {file ? (
              <video src={URL.createObjectURL(file)} controls />
            ) : (
              <p>Drop your mp4 file here or click to browse</p>
            )}
            <button>HERE</button>
          </div>
        )}
      </Dropzone>
      {file && (
        <div>
          <p>Upload progress: {uploadProgress}%</p>
        </div>
      )}
    </div>
  );
};

export default Upload;
