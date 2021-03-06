import React from 'react'
import CreatableSelect from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import Select from 'react-select'

// , _legacyMusicData, onAddFileMetadata, fileMetadata, albumList, songList, handleChange, albumOptions, songOptions

const FileUploadForm = ({onSelectSong, sendToS3, onAddFileData, fileInput}) => {


  // const parsedAlbumOptions = () => {
  //   if (!!albumOptions && albumOptions.length > 0) {
  //     return albumOptions.map((album) => {
  //       return {value: album.id, label: album.title}
  //     })
  //   }
  // }
  //
  //
  //
  // const parsedSongOptions = () => {
  //   if (!!songOptions && Object.keys(songOptions).length > 0) {
  //     return songOptions.map((song) => {
  //       return {value: song.id, label: song.title}
  //     })
  //
  //   }
  // }

  return (
    <div>
      <h3>Upload Files</h3>

      <form onSubmit={sendToS3}>
        <input onChange={onAddFileData} type="file" name="file" ref={fileInput} multiple />
        <button type="submit"> Submit </button>
      </form>
    </div>
  )
}



export default FileUploadForm
