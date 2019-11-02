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

  componentDidMount() {
     this.parseAlbumOptions()

  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.albumInput == this.state.albumInput) {
  //     this.renderAlbumInput()
  //     this.renderSongInput()
  //   }
  //
  //   if (prevState.songInput == this.state.songInput) {
  //     this.renderAlbumInput()
  //
  //     this.renderSongInput()
  //   }
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

  // handleChange = (newValue: any, actionMeta: any) => {
  //
  //   if (actionMeta.name == "song") {
  //     this._onSelectSong(newValue)
  //   } else if (actionMeta.name == "album"){
  //     this._onSelectAlbum(newValue)
  //   }
  // }

  _onSelectAlbum = (newValue) => {
    if (newValue == null) {
      this.setState({
        albumInput: null
      }, this.parseSongOptions)
    } else {
      this.setState({
        albumInput: this.props.albumData.find((album) => album.id == newValue.value)
      }, this.parseSongOptions)
    }

  }

  _onSelectSong = (newValue) => {
    if (newValue == null) {
      this.setState({
        songInput: null
      })
    } else {
      if (this.state.albumInput == null) {
        let song = this.props.songData.find((song) => song.id == newValue.value)

        let album = this.props.albumData.find((album) => album.id == song.album_id)
        this.setState({
          albumInput: album,
          songInput: song
        })
      } else {
        let song = this.props.songData.find((song) => song.id == newValue.value)

         this.setState({
          songInput: this.props.songData.find((song) => song.id == newValue.value)
        }, this.parseAlbumOptions)

      }
    }

  }

  _onAddFileData = event => {
    this.setState({
      files: [...this.fileInput.current.files],
      preview: URL.createObjectURL(event.target.files[0]),
    })
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

  renderAlbumInput = () => {
    return !!this.state.albumInput ? (
       {value: this.state.albumInput.id, label: this.state.albumInput.title}
    ) : (
       null
    )

  }

  renderSongInput = () => {
    return this.state.songInput
  }

  renderPreview = () => {
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

              <div>
                <FileAlbumInput onSelectAlbum={this.onSelectAlbum} parseAlbumOptions={this.parseAlbumOptions} albumInput={this.renderAlbumInput} />

                <FileSongInput onSelectSong={this.onSelectSong} parseSongOptions={this.parseSongOptions} songInput={this.renderSongInput} />

                <hr />

                <FileUploadForm sendToS3={this.sendToS3} onAddFileData={this.onAddFileData} fileInput={this.fileInput} />

              </div>
            }

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
            //   <FileUploadForm
            //     parseAlbumOptions={this.parseAlbumOptions}
            //     parseSongOptions = {this.parseSongOptions}
            //     onSelectSong = {this.onSelectSong}
            //     handleChange={this.handleChange}
            //     sendToS3={this.sendToS3}
            //     onAddFileData={this.onAddFileData}
            //     fileInput={this.fileInput} />
            // }

  export default FileUploadContainer
