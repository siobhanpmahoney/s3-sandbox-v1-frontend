import React from 'react';
import {useDropzone} from 'react-dropzone';

export default function MyDropzone2(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    getFilesFromEvent: event => myCustomFileGetter(event, props)
  });

  const files = acceptedFiles.map(f => (
    <li key={f.name}>
      {f.name} has <strong>myProps</strong>: {f.myProp === true ? 'YES' : ''}
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
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
