import React from 'react'

import {withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {removeCurrentUserAction, fetchAlbumDataAction, fetchSongDataAction, createAlbumAction, createVersionAction} from '../../actions'

import WithAuth from '../../wrappers/WithAuth'

import FileUploadPreview from './FileUploadPreview'
import FileUploadForm from './FileUploadForm'
import FileAlbumInput from './FileAlbumInput'
import FileSongInput from './FileSongInput'
import FileDateInput from './FileDateInput'
import FileDescriptionInput from './FileDescriptionInput'
import FileUploadConfirmation from './FileUploadConfirmation'
import NewAlbumForm from './NewAlbumForm'
import NewAlbumConfirmationMsg from './NewAlbumConfirmationMsg'
// import { createSong } from '../../service'
import Loader from '../utils/Loader'



class FileUploadContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      preview: null,
      newAlbumInput: {
        title: null,
        image: null
      },
      albumInput: null,
      songInput: null,
      descriptionInput: "",
      dateInput: undefined,
      isLoading: false,
      confirmedUploadedFile: null,
      isRenderingFileUploadConfirmation: false,
      isRenderingNewAlbumForm: false
    };
    this.fileInput = React.createRef();
    this.onAddFileData = this._onAddFileData.bind(this);
    this.onSelectAlbum = this._onSelectAlbum.bind(this)
    this.onSelectSong = this._onSelectSong.bind(this)
  }

  componentDidMount() {
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

    if (this.state.dateInput != prevState.dateInput) {
      this.renderDateInput()
    }
  }

  onToggleNewAlbumForm = () => {
    this.setState({
      isRenderingNewAlbumForm: !this.state.isRenderingNewAlbumForm
    })
  }

  newAlbumFormListener = (event) => {
    let val = event.target.value
    let updatedState = this.state.newAlbumInput
    updatedState[event.target.name] = event.target.value

    this.setState({
      newAlbumInput: updatedState
    })
  }

  // clear form state
  // render new album confirmation message
  //

  onCreateAlbum = () => {
    let albumData = this.state.newAlbumInput

    this.props.createAlbumAction(albumData)
    .then(result => {
      this.setState({
        newAlbumInput: {
          title: null,
          image: null
        }
      }, this.onToggleNewAlbumForm)
      return result 
    })

    .then(res => alert(`New Album Created: ${res.title}`))
  }



  parseAlbumOptions = () => {
    if (this.state.songInput != null) {
      let album = this.props.albums.find((album) => album.id == this.state.songInput.album_id )
      return {value: album.id, label: album.title}
    } else {
      return this.props.albums.map((album) => {
        return {value: album.id, label: album.title}
      })
    }
  }

  parseSongOptions = () => {
    let songs
    this.state.albumInput != null ? (
      songs = this.props.songs.filter((song) => song.album_id == this.state.albumInput.id)
      .map((s) => {
        return { value: s.id, label: s.title }
      })
    ) : (
      songs = this.props.songs.map((song) => {
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
        albumInput: this.props.albums.find((album) => album.id == newValue.value)
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
        let song = this.props.songs.find((song) => song.id == newValue.value)

        let album = this.props.albums.find((album) => album.id == song.album_id)
        this.setState({
          albumInput: album,
          songInput: song
        }, this.renderSongInput)
      } else {
        let song = this.props.songs.find((song) => song.id == newValue.value)
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

  onAddFileDate = (day) => {
    return !!day ? (
      this.setState({
        dateInput: day.toString()
      })
    ) : (
      null
    )

  }

  onAddFileDescription = (event) => {
    this.setState({
      descriptionInput: event.target.value
    })
  }

  sendToS3 = (event) => {
    event.preventDefault()
    let formdata = new FormData();
    formdata.append('date', this.state.dateInput)
    formdata.append('description', this.state.descriptionInput)
    formdata.append('file', this.state.files[0])

    this.props.createVersionAction(this.state.songInput, formdata)

    .then(j => {
      this.setState({
        confirmedUploadedFile: j
      }, this.onToggleFileUploadConfirmation)
      return this.clearMetadataOnSubmit()
    })
  }

  onToggleFileUploadConfirmation = () => {
    this.setState({
      isRenderingFileUploadConfirmation: !this.state.isRenderingFileUploadConfirmation
    })
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
      albumInput: null,
      dateInput: undefined,
      descriptionInput: ""
    }, this.clearFileInputRef)
  }

  clearFileInputRef = () => {
    this.fileInput.current.value = ""
    this.renderAlbumInput()
    this.renderSongInput()
    this.renderDateInput()
  }

  clearUploadConfirmation = () => {
    this.setState({
      confirmedUploadedFile: null
    }, this.onToggleFileUploadConfirmation)
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

  renderDateInput = () => {
    return !!this.state.dateInput ? (
      this.state.dateInput
    ) : (
      null
    )
  }

  renderDescriptionInput = () => {
    return !!this.state.descriptionInput ? (
      this.state.descriptionInput
    ) : (
      null
    )
  }

  renderPreview = () => {
    return (
      <FileUploadPreview preview = {this.state.preview} />
    )
  }



  renderFileUploadConfirmation = () => {
    if (!!this.state.confirmedUploadedFile) {
      return (
        <FileUploadConfirmation version={this.state.confirmedUploadedFile} album={this.props.albums.find((album) => album.id == this.state.confirmedUploadedFile.song.album_id)} clearUploadConfirmation={this.clearUploadConfirmation}/>
      )
    } else {
      return;
    }

  }

  render() {
    const emptyArray = () => {
      return []
    }
    return (
      <div className="file__upload__container">
        {!!this.props.albums && !!this.props.songs && this.props.albums.length > 0 && this.props.songs.length > 0 ? (

          <div className="file__upload__info-container">
            {!!this.state.isRenderingFileUploadConfirmation &&

              <div className="file__upload__confirmation-component">
                {this.renderFileUploadConfirmation()}
              </div>

            }

            <button onClick={this.onToggleNewAlbumForm}>

              {!this.state.isRenderingNewAlbumForm ? "New Album" : "Back" }

            </button>

            <div className="formWrapper">
              {!this.state.isRenderingNewAlbumForm ? (

                <div className="file__upload__metadata-section">

                  <div className="file__upload__album-and-song-section">

                    <FileAlbumInput onSelectAlbum={this.onSelectAlbum} parseAlbumOptions={this.parseAlbumOptions} albumInput={this.renderAlbumInput} />

                    <FileSongInput onSelectSong={this.onSelectSong} onCreateSong={this.onCreateSong} parseSongOptions={this.parseSongOptions} songInput={this.renderSongInput} />

                  </div>

                  <div className="file__upload__version-section">

                    <FileDateInput onAddFileDate={this.onAddFileDate} dateInput={this.renderDateInput}/>

                    <FileDescriptionInput onAddFileDescription={this.onAddFileDescription} descriptionInput={this.state.descriptionInput} />

                  </div>
                  <FileUploadForm sendToS3={this.sendToS3} onAddFileData={this.onAddFileData} fileInput={this.fileInput} />
                </div>

              ) : (
                <div>

                  <NewAlbumForm newAlbumFormListener={this.newAlbumFormListener} albumTitle={this.state.newAlbumInput.title} albumImage={this.state.newAlbumInput.image} onCreateAlbum={this.onCreateAlbum}/>
                </div>

              )}
            </div>
          </div>
        ) : (
          <div>
            <Loader />
          </div>
        )
      }

      {!!this.state.preview &&

        <div>
          <h5>Upload Preview</h5>
          {this.renderPreview()}
        </div>
      }

    </div>
  )}
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
    albums: state.albums,
    songs: state.songs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({removeCurrentUserAction,fetchAlbumDataAction, fetchSongDataAction, createAlbumAction, createVersionAction}, dispatch)
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(FileUploadContainer)))
