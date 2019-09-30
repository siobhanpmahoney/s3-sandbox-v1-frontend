import React, {useCallback, useState, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';

export default function MyDropzone2(props) {
  const [files, setFiles] = useState([]);

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => {
        return Object.assign(file, {preview: URL.createObjectURL(file)})
      }
    ));
  },
    getFilesFromEvent: event => myCustomFileGetter(event, props)
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
    files.forEach(file => file.preview);

    // files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);


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

 async function myCustomFileGetter(event, props) {
  const files = [];
  const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;

  for (var i = 0; i < fileList.length; i++) {
    const file = fileList.item(i);

    Object.defineProperty(file, 'myProp', {
      value: true
    });

    files.push(file);
    props.addFileToState(file)
  }

  return files;
}
