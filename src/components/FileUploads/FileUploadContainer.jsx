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

  componentDidUpdate(prevProps, prevState) {
     // this.returnFileMetadata()
     if (this.state.fileMetadata["album"] != prevState.fileMetadata["album"]) {
       if (this.state.fileMetadata["album"] == null) {
         this.renderAlbumOptions()
       }
       this.renderSongOptions()
     }
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

    if (this.state.fileMetadata["album"] == null) {
      return this.state.albumList
    } else {
      return this.state.albumList.find((album) => album.id == this.state.fileMetadata.album.id)
    }
  }

  renderSongOptions = () => {
     if (this.state.fileMetadata.album != null) {
       console.log(this.state.songList[this.state.fileMetadata.album.id])
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

  handleChange = (newValue, actionMeta: any) => {
    // let album_id = newValue
    // if (actionMeta.action == "clear") {
    //
    // }
    if (actionMeta.name == "album") {
      this.onSelectAlbum(newValue)
    } else {
      this.onSelectSong(newValue)
    }

    // let album = this.state.albumList.find((album) => album.id == newValue.value)
    // let fileMetadataCopy = Object.assign({}, this.state.fileMetadata)
    // fileMetadataCopy[actionMeta.name] = album
    // this.setState({
    //   fileMetadata: fileMetadataCopy
    // }, this.renderSongOptions)
  }

  onSelectAlbum = (selectedValue) => {
    let album = this.state.albumList.find((album) => album.id == selectedValue.value)
    let fileMetadataCopy = Object.assign({}, this.state.fileMetadata)
    fileMetadataCopy["album"] = album
    this.setState({
      fileMetadata: fileMetadataCopy
    }, this.renderSongOptions)
  }

  onSelectSong = (selectedValue) => {
    let song = null
    if (this.state.fileMetadata["album"] == null) { // if song is selected before album is selected, find the associated album
      let fileMetadataSongs = Object.assign({}, this.state.fileMetadata["songs"])
      let i = 0
      let album = null
      while (i < Object.keys(fileMetadataSongs)) {
        if (fileMetadataSongs[i].find((s) => s.id == selectedValue.value)) {
          return song = fileMetadataSongs[i].find((s) => s.id == selectedValue.value)
        } else {
          i++
        }
        album = this.state.albumList.find((a) => a.id == i)
      }
      let fileMetadataCopy = Object.assign({}, this.state.fileMetadataCopy)
      fileMetadataCopy["album"] = album
      fileMetadataCopy["song"] = song
      this.setState({
        fileMetadata: fileMetadataCopy
      })
    } else {

      song = this.state.songList[this.state.fileMetadata.album.id].find((s) => s.id == selectedValue.value)
      let fileMetadataCopy = Object.assign({}, this.state.fileMetadataCopy)
      fileMetadataCopy["song"] = song
      this.setState({
        fileMetadata: fileMetadataCopy
      })
    }
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
      // if (this.state.albumList && this.state.albumList.length > 0 ) {
      //   console.log("songList", this.renderSongOptions())
      // }

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
