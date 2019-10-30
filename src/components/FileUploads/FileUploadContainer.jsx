import React from 'react'
import FileUploadPreview from './FileUploadPreview'
import FileUploadForm from './FileUploadForm'

class FileUploadContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      preview: null,
      albumList: null, // [],
      songList: null, // {}, indexed by Album id
      fileMetadata: {
        album: null,
        song: null,
        version: null,
        description: null
      }
    };
    this.fileInput = React.createRef();
    this.onAddFileData = this._onAddFileData.bind(this);
  }

  componentDidMount() {
    if (!!this.props.musicData && this.props.musicData.length > 0) {
      let musicData = this.parseMusicData()
      this.setState({
        albumList: musicData.albums,
        songList: musicData.songs
      }, () => console.log(this.state))
    }
  }

  componentDidUpdate(prevProps) {
     this.returnFileMetadata()
  }

  parseMusicData = () => {
    let songs = {}
    let albums = this.props.musicData.map((album => {
      songs[album.id] = album.songs
      return {id: album.id, title: album.title, s3_key: album.s3_key, etag: album.etag}
    }))
    return {albums: albums, songs: songs}
  }

  renderAlbumOptions = () => {
    return this.state.albumList
  }

  renderSongOptions = () => {
     if (!!this.state.fileMetadata.album) {
       return this.state.songList[this.state.fileMetadata.album.id]
     } else {
         return Object.keys(this.state.songList).map((album_id) => this.state.songList[album_id].map((song) => song)).flat()
     }
  }

  returnFileMetadata = () => {
    return this.state.fileMetadata
  }

  _onAddFileData = event => {
    this.setState({
      files: [...this.fileInput.current.files],
      preview: URL.createObjectURL(event.target.files[0]),
    });
  };

  // onAddFileMetadata = (event) => {
  //   let fileMetadataCopy = Object.assign({}, this.state.fileMetadata)
  //   fileMetadataCopy[event.target.name] = event.target.value
  //   this.setState({
  //     fileMetadata: fileMetadataCopy
  //   })
  // }

  handleChange = (newValue, actionMeta) => {
    // let album_id = newValue
    let album = this.state.albumList.find((album) => album.id == newValue.value)
    let fileMetadataCopy = Object.assign({}, this.state.fileMetadata)
    fileMetadataCopy[actionMeta.name] = album
    this.setState({
      fileMetadata: fileMetadataCopy
    }, this.renderSongOptions)
  }



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
    .then(j => this.clearFileOnSubmit());
  };

  clearFileOnSubmit = () => {
    this.setState({
      files: [],
      preview: null
    })
  }

  renderPreview = () => {
    return (
      <FileUploadPreview preview = {this.state.preview} />
      )
    }

    render() {
      if (this.state.albumList && this.state.albumList.length > 0 ) {
        console.log("songList", this.renderSongOptions())
      }

      return (
        <div>
          {this.state.albumList && this.state.albumList.length > 0 ? (
            <div>
            <FileUploadForm sendToS3={this.sendToS3} onAddFileData={this.onAddFileData} fileInput={this.fileInput} musicData={this.props.musicData} fileMetadata={this.returnFileMetadata()} albumList={this.state.albumList} songList = {this.state.songList} onAddFileMetadata={this.onAddFileMetadata} handleChange={this.handleChange} albumOptions = {this.renderAlbumOptions()} songOptions={this.renderSongOptions()}/>

            <hr />

            {!!this.state.preview &&
              <div>
                <h5>Upload Preview</h5>
                {this.renderPreview()}
              </div>
            }
            </div>
          ) : (
              <div>loading..</div>
          )

          }

        </div>
      )
    }
  }

  export default FileUploadContainer
