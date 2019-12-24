import React from 'react'

const SongListDataWithAudio = ({songListData, selectViewOption}) => {
    return (
      <div>
      {songListData.map((album) => {
      return (
        <div className="album-section">
          <div className="album-header">
            {album.title}
          </div>

          {album.songs.map((song) => {

            return <div className="song-section">
                <div className="song-header">
                  {song.title}
                </div>

                {song.versions.map((version) => {
                  return (
                    <div className="version-section">
                      <ul>
                        <li>id: {version.id}</li>
                        <li> date: {version.date_created} </li>
                        <li>description: {version.description} </li>
                        <li>s3_key: {version.s3_key} </li>
            <audio controls>
              <source src={`https://sandbox-v3.s3.amazonaws.com/${version.s3_key}`} type="audio/x-m4a" / >
            </audio>
                        <li>etag: {version.etag} </li>
                      </ul>
                      <br />
                    </div>
                  )
                })}
              </div>


          })}

        </div>
      )
    })}
    </div>
)
}

export default SongListDataWithAudio
