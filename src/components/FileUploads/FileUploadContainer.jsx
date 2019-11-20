import React from 'react'
import FileUploadPreview from './FileUploadPreview'
import FileUploadForm from './FileUploadForm'
import FileAlbumInput from './FileAlbumInput'
import FileSongInput from './FileSongInput'
import { createSong } from '../../service'


class FileUploadContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      preview: null,
      albumInput: null,
      songInput: null,
      descriptionInput: null,
      dateInput: null
    };
    this.fileInput = React.createRef();
    this.onAddFileData = this._onAddFileData.bind(this);
    this.onSelectAlbum = this._onSelectAlbum.bind(this)
    this.onSelectSong = this._onSelectSong.bind(this)
  }

  componentDidMount() {
    console.log("state on mount", this.state)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.albumInput == null && prevState.albumInput != null) {
      this.renderAlbumInput()
      this.parseAlbumOptions()
    }

    if (this.state.songInput == null && prevState.songInput != null) {
      this.renderSongInput()
      this.parseSongOptions()
    }
  }

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
    let songs
    this.state.albumInput != null ? (
      songs = this.props.songData.filter((song) => song.album_id == this.state.albumInput.id)
      .map((s) => {
        return { value: s.id, label: s.title }
      })
    ) : (
      songs = this.props.songData.map((song) => {
        return { value: song.id, label: song.title }
      })
    )

    if (this.state.songInput && this.state.songInput.id == null) {
      return [...songs, {value: null, label: this.state.songInput.title}]
    }
    return songs
  }

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
      }, this.renderSongInput)
    } else {
      if (!!newValue.__isNew__) {
        this.onCreateSong(newValue)
      } else if (this.state.albumInput == null) {
        let song = this.props.songData.find((song) => song.id == newValue.value)

        let album = this.props.albumData.find((album) => album.id == song.album_id)
        this.setState({
          albumInput: album,
          songInput: song
        }, this.renderSongInput)
      } else {
        let song = this.props.songData.find((song) => song.id == newValue.value)
        this.setState({
          songInput: song
        }, this.parseAlbumOptions)
        this.renderSongInput()
      }
      }
    }

    onCreateSong = (inputValue) => {
      let albumInput = this.state.albumInput
      return this.setState({
        songInput: {id: null, title: inputValue.value, album_id: albumInput.id }
      }, this.parseSongOptions)
    }

    _onAddFileData = event => {
      this.setState({
        files: [...this.fileInput.current.files],
        preview: URL.createObjectURL(event.target.files[0]),
      })
    }


    sendToS3 = event => {
      event.preventDefault();

      if (this.state.songInput.id == null) {
        createSong({album_id: this.state.songInput.album_id, title: this.state.songInput.title})
        .then(response => {
          let songInputState = Object.assign({}, this.state.songInput)
          songInputState['id'] = response.id
          this.setState({
            songInput: songInputState
          })
        })
        .then(res => this.prepareVersionDataForS3())
      } else {
        return this.prepareVersionDataForS3()
      }
    }

    prepareVersionDataForS3 = () => {
      let formdata = new FormData();
      formdata.append('song_id', this.state.songInput.id);
      formdata.append('file', this.state.files[0]);

      fetch('http://localhost:3000/api/v1/versions', {
        method: 'POST',
        body: formdata,
      })
      .then(rez => rez.json())
      .then(j => {
        console.log("j", j)
        return this.clearMetadataOnSubmit()
      });
    }

    // after prepareVersionDataForS3 => check song created successfully (error check)
    // if yes =>render version record
    // else: render message indicating as much
    // THEN clearMetadataOnSubmit


    clearMetadataOnSubmit = () => {

      this.setState({
        files: [],
        preview: null,
        songInput: null,
        albumInput: null
      }, this.clearFileInputRef)
    }

    clearFileInputRef = () => {
      this.fileInput.current.value = ""
      this.renderAlbumInput()
      this.renderSongInput()
    }


    renderAlbumInput = () => {
      return !!this.state.albumInput ? (
         {value: this.state.albumInput.id, label: this.state.albumInput.title}
      ) : (
         null
      )

    }

    renderSongInput = () => {

      return !!this.state.songInput ? (
        {value: this.state.songInput.id, label: this.state.songInput.title}
      ) : (
        null
      )
    }

    renderPreview = () => {
      return (
        <FileUploadPreview preview = {this.state.preview} />
      )
    }

    render() {

      return (
        <div>
          {!!this.props.albumData && !!this.props.songData && this.props.albumData.length > 0 && this.props.songData.length > 0 &&

            <div>
              <FileAlbumInput onSelectAlbum={this.onSelectAlbum} parseAlbumOptions={this.parseAlbumOptions} albumInput={this.renderAlbumInput} />

              <FileSongInput onSelectSong={this.onSelectSong} onCreateSong={this.onCreateSong} parseSongOptions={this.parseSongOptions} songInput={this.renderSongInput} />

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

  export default FileUploadContainer
