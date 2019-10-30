import React from 'react'
import CreatableSelect from 'react-select/creatable';


const FileUploadForm = ({sendToS3, onAddFileData, fileInput, musicData, onAddFileMetadata, fileMetadata, albumList, songList, handleChange, albumOptions, songOptions}) => {

  const parsedAlbumOptions = () => {
    if (!!albumOptions && albumOptions.length > 0) {
      return albumOptions.map((album) => {
        return {value: album.id, label: album.title}
      })
    }
  }



  const parsedSongOptions = () => {
    if (!!songOptions && Object.keys(songList).length > 0) {
      return songOptions.map((song) => {
        return {value: song.id, label: song.title}
      })

    }
  }

  return (
    <div>
      <h3>Upload Files</h3>

      <form onSubmit={sendToS3}>

{!!parsedAlbumOptions() && parsedAlbumOptions().length > 0 &&
  <div>
        <CreatableSelect
          isClearable
          onChange={handleChange}
          onInputChange={handleChange}
          options={parsedAlbumOptions()}
          name="album"
          defaultOptions
          />

          <CreatableSelect
            isClearable
            onChange={handleChange}
            onInputChange={handleChange}
            options={parsedSongOptions()}
            name="song"
            defaultOptions
          />
        </div>
}
        <input onChange={onAddFileData} type="file" name="file" ref={fileInput} multiple />
        <button type="submit"> Submit </button>
      </form>
    </div>
  )
}

export default FileUploadForm
