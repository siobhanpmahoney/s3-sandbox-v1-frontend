import React from 'react'
import CreatableSelect from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import Select from 'react-select'

// , _legacyMusicData, onAddFileMetadata, fileMetadata, albumList, songList, handleChange, albumOptions, songOptions

const FileUploadForm = ({loadAlbumOptions, loadSongOptions, parseAlbumOptions, parseSongOptions, handleChange, albumInput, songInput, sendToS3, onAddFileData, fileInput}) => {

  const albumOptions = () => {
    return parseAlbumOptions()
  }

  const songOptions  = () => {
    return parseSongOptions()
  }


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
        {!!albumOptions() && albumOptions().length > 0 && !!songOptions() && songOptions().length >= 0 &&
          <div>
                <Select
                  onChange={handleChange}
                  name="album"
                  options = {parseAlbumOptions()}
                  defaultValue={albumInput}
                  isClearable
                  />

                <Select
                    onChange={handleChange}
                    name="song"
                    options = {parseSongOptions()}
                    defaultValue={songInput}
                    isClearable
                  />
                <hr />





              </div>
        }

      <form onSubmit={sendToS3}>
        <input onChange={onAddFileData} type="file" name="file" ref={fileInput} multiple />
        <button type="submit"> Submit </button>
      </form>
    </div>
  )
}



export default FileUploadForm
