import React from 'react'
import FileUploadPreview from './FileUploadPreview'
import FileUploadForm from './FileUploadForm'

class FileUploadContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      example: {},
      files: [],
      preview: null
    };
    this.fileInput = React.createRef();
    this.onAddFileData = this._onAddFileData.bind(this);
  }

  _onAddFileData = event => {
    this.setState({
      files: [...this.fileInput.current.files],
      preview: URL.createObjectURL(event.target.files[0]),
    });
  };

  sendToS3 = event => {
    event.preventDefault();
    let formdata = new FormData();
    formdata.append('song_id', '2');
    formdata.append('file', this.state.files[0]);

    fetch('http://localhost:3000/api/v1/versions', {
      method: 'POST',
      body: formdata,
    })
    .then(rez => rez.json())
    .then(j => console.log(j));
  };

  renderPreview = () => {
    return (
      <FileUploadPreview preview = {this.state.preview} />
      )
    }

    render() {
      return (
        <div>
          <FileUploadForm sendToS3={this.sendToS3} onAddFileData={this.onAddFileData} fileInput={this.fileInput} />

{/*
          <div>
            <h3>Upload Files</h3>

            <form onSubmit={this.sendToS3}>
              <input onChange={this.onAddFileData} type="file" name="file" ref={this.fileInput} multiple />
              <button type="submit"> Submit </button>
            </form>
          </div>
*/}
          <hr />
          {!!this.state.preview &&
            <div>
              <h5>Upload Preview</h5>
              {this.renderPreview()}
            </div>
          }
        </div>
      )
    }
  }

  export default FileUploadContainer
