import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'

export default function MyDropzone(multiple) {

   const [files, setFiles] = useState([]);
   const {getRootProps, getInputProps} = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div key={file.name}>
      <div>
        <audio controls
          src={file.preview}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  //
  // # const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  //  # const files = acceptedFiles.map(file => (
  //  #   <li key={file.path}>
  //  #     {file.path} - {file.size} bytes
  //  #   </li>
  //  # ));
  //  # return (
  //  #   <section className="container">
  //  #     <div {...getRootProps({className: 'dropzone'})}>
  //  #       <input {...getInputProps()} />
  //  #       <p>Drag 'n' drop some files here, or click to select files</p>
  //  #     </div>
  //  #     <aside>
  //  #       <h4>Files</h4>
  //  #       <ul>{files}</ul>
  //  #     </aside>
  //  #   </section>
  //  # );

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        {thumbs}
      </aside>
    </section>
  );


 }

{/*
    # onDrop: acceptedFiles => {
    #   setFiles(acceptedFiles.map(file => Object.assign(file, {
    #     preview: URL.createObjectURL(file)
    #     })))
    #     }})
    #
    #     const thumbs = files.map(file => (
    #       <div key={file.name}>
    #         <div>
    #           <audio controls>
    #             <source src={file.preview} type="audio/m4a" />
    #           </audio>
    #         </div>
    #       </div>
    #     ));
    #
    #     const files = acceptedFiles.map(file => (
    #       <li key={file.path}>
    #         {file.path} - {file.size} bytes
    #       </li>
    #     ));

    #
    #     return (

*/}
