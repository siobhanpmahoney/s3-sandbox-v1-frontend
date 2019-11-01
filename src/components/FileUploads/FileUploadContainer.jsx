import React from 'react'
import FileUploadPreview from './FileUploadPreview'
import FileUploadForm from './FileUploadForm'
import FileAlbumInput from './FileAlbumInput'
import FileSongInput from './FileSongInput'


class FileUploadContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      preview: null,
      albumInput: null,
      songInput: null
    };
    this.fileInput = React.createRef();
    this.onAddFileData = this._onAddFileData.bind(this);
    this.onSelectAlbum = this._onSelectAlbum.bind(this)
    this.onSelectSong = this._onSelectSong.bind(this)
  }

  // componentDidMount() {
  //    this.parseAlbumOptions()
  //
  // }

  parseAlbumOptions = () => {
      if (this.state.songInput != null) {
        let album = this.props.albumData.find((album) => album.id == this.state.songInput.album_id )
        return {value: album.id, label: album.title}
      } else {
        return this.props.albumData.map((album) => {
          return {value: album.id, label: album.title}
        })
      }
  }

  parseSongOptions = () => {
    console.log("getting parsed?")
    if (this.state.albumInput != null) {
      return this.props.songData.filter((song) => song.album_id == this.state.albumInput.id)
      .map((s) => {
        return { value: s.id, label: s.title }
      })
    } else {
      return this.props.songData.map((song) => {
        return { value: song.id, label: song.title }
      })
    }

  }


  // handleChange = (newValue, actionMeta: any) => {
  //   // let album_id = newValue
  //   // if (actionMeta.action == "clear") {
  //   //
  //   // }
  //   debugger
  //   if (actionMeta.name == "album") {
  //     this.onSelectAlbum(newValue)
  //   } else {
  //     this.onSelectSong(newValue)
  //   }
  //
  //   //   let album = this.state.albumList.find((album) => album.id == selectedValue.value)
  //   //   let fileMetadataCopy = Object.assign({}, this.state.fileMetadata)
  //   //   fileMetadataCopy["album"] = album
  //   //   this.setState({
  //   //     fileMetadata: fileMetadataCopy
  //   //   }, this._legacyRenderSongOptions)
  //   // }
  //   //
  //
  //   // let album = this.state.albumList.find((album) => album.id == newValue.value)
  //   // let fileMetadataCopy = Object.assign({}, this.state.fileMetadata)
  //   // fileMetadataCopy[actionMeta.name] = album
  //   // this.setState({
  //   //   fileMetadata: fileMetadataCopy
  //   // }, this._legacyRenderSongOptions)
  // }

  handleChange = (newValue: any, actionMeta: any) => {
    // console.group('Value Changed');
    // console.log("actionMeta", actionMeta)
    // console.log("newValue", newValue)
    // console.log(`action: ${actionMeta.action}`);
    // console.log("actionMeta.name", actionMeta.name)
    // console.log("actionMeta.name == song", actionMeta.name == "song")
    // console.groupEnd();

    // if (actionMeta.name == "album") {
    //   this.onSelectAlbum(newValue)
    // } else {
    //   this.onSelectSong(newValue)
    // }

    if (actionMeta.name == "song") {
      this._onSelectSong(newValue)
      // this.onSelectAlbum(newValue)
    } else if (actionMeta.name == "album"){
      this._onSelectAlbum(newValue)
    }
  }

  _onSelectAlbum = (newValue) => {
    this.setState({
      albumInput: this.props.albumData.find((album) => album.id == newValue.value)
    }, this.parseSongOptions)
  }

  _onSelectSong = (newValue) => {
    // if (this.state.albumInput == null) {
    //   let song = this.props.songData.find((song) => song.id == newValue.value)
    //
    //   let album = this.props.albumData.find((album) => album.id == song.album_id)
    //   this.setState({
    //     albumInput: album,
    //     songInput: song
    //   }, this.parseAlbumOptions)
    // } else {
    //   let song = this.props.songData.find((song) => song.id == newValue.value)

       this.setState({
        songInput: this.props.songData.find((song) => song.id == newValue.value)
      }, this.parseAlbumOptions)

    // }
  }


  // parse_legacyMusicData = () => {
  //   let songs = {}
  //   let albums = this.props._legacyMusicData.map((album => {
  //     songs[album.id] = album.songs
  //     return {id: album.id, title: album.title, s3_key: album.s3_key, etag: album.etag}
  //   }))
  //   return {albums: albums, songs: songs}
  // }
  //
  // renderAlbumOptions = () => {
  //
  //   if (this.state.fileMetadata["album"] == null) {
  //     return this.state.albumList
  //   } else {
  //     return this.state.albumList.find((album) => album.id == this.state.fileMetadata.album.id)
  //   }
  // }
  //
  // _legacyRenderSongOptions = () => {
  //    if (this.state.fileMetadata.album != null) {
  //      console.log(this.state.songList[this.state.fileMetadata.album.id])
  //      return this.state.songList[this.state.fileMetadata.album.id]
  //    } else {
  //      return Object.keys(this.state.songList).map((album_id) => this.state.songList[album_id].map((song) => song)).flat()
  //    }
  // }

  // returnFileMetadata = () => {
  //   return this.state.fileMetadata
  // }

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



  // onSelectAlbum = (selectedValue) => {

  // onSelectSong = (selectedValue) => {
  //   let song = null
  //   if (this.state.fileMetadata["album"] == null) { // if song is selected before album is selected, find the associated album
  //     let fileMetadataSongs = Object.assign({}, this.state.fileMetadata["songs"])
  //     let i = 0
  //     let album = null
  //     while (i < Object.keys(fileMetadataSongs)) {
  //       if (fileMetadataSongs[i].find((s) => s.id == selectedValue.value)) {
  //         return song = fileMetadataSongs[i].find((s) => s.id == selectedValue.value)
  //       } else {
  //         i++
  //       }
  //       album = this.state.albumList.find((a) => a.id == i)
  //     }
  //     let fileMetadataCopy = Object.assign({}, this.state.fileMetadataCopy)
  //     fileMetadataCopy["album"] = album
  //     fileMetadataCopy["song"] = song
  //     this.setState({
  //       fileMetadata: fileMetadataCopy
  //     })
  //   } else {
  //
  //     song = this.state.songList[this.state.fileMetadata.album.id].find((s) => s.id == selectedValue.value)
  //     let fileMetadataCopy = Object.assign({}, this.state.fileMetadataCopy)
  //     fileMetadataCopy["song"] = song
  //     this.setState({
  //       fileMetadata: fileMetadataCopy
  //     })
  //   }
  // }
  //


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

  renderAlbumInput = () => {
    return this.state.albumInput
  }

  renderSongInput = () => {
    return this.state.songInput
  }

  renderPreview = (event) => {
    event.preventDefault()
    return (
      <FileUploadPreview preview = {this.state.preview} />
      )
    }

    render() {
      // if (this.state.albumList && this.state.albumList.length > 0 ) {
      //   console.log("songList", this._legacyRenderSongOptions())
      // }

        return (
          <div>
            {!!this.props.albumData && !!this.props.songData && this.props.albumData.length > 0 && this.props.songData.length > 0 &&

            <FileUploadForm
              parseAlbumOptions={this.parseAlbumOptions}
              parseSongOptions = {this.parseSongOptions}
              onSelectSong = {this.onSelectSong}
              handleChange={this.handleChange}
              sendToS3={this.sendToS3}
              onAddFileData={this.onAddFileData}
              fileInput={this.fileInput} />
          }

          <FileAlbumInput onSelectAlbum={this.onSelectAlbum} parseAlbumOptions={this.parseAlbumOptions} />
          <FileSongInput onSelectSong={this.onSelectSong} parseSongOptions={this.parseSongOptions} />


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

              // <FileUploadForm sendToS3={this.sendToS3} onAddFileData={this.onAddFileData} fileInput={this.fileInput} _legacyMusicData={this.props._legacyMusicData} fileMetadata={this.returnFileMetadata()} albumList={this.state.albumList} songList = {this.state.songList} onAddFileMetadata={this.onAddFileMetadata} handleChange={this.handleChange} albumOptions = {this.renderAlbumOptions()} songOptions={this._legacyRenderSongOptions()}/>

  export default FileUploadContainer
