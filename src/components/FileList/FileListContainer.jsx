import React from 'react'
import AlbumListItem from './AlbumListItem'
import SongListData from './SongListData'
import SongListDataWithAudio from './SongListDataWithAudio'

class FileListContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      view: null, // choices: Song List // Song List with Audio
      songListData: [], // schema:
      songFiles: {}
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.setState({
      view: null,
      files: {}
    })
    // this.fetchSongData
  }

  getSignedUrl = () => {

  }
  //
  // fetchSongData = () => {
  //   fetch("http://localhost:3000/api/v1/albums")
  //   .then(results => results.json())
  //   .then(json => {
  //     console.log(json)
  //     return this.setState({
  //       songListData: json
  //     })
  //   })
  // }

  render() {
    console.log(this.props.songData)
    return (
      <div>
        {this.props.albumData.map((album) => {
          return <AlbumListItem album={album} songList = {this.props.songData.filter((song) => song.album_id == album.id)}/>
        })}
      </div>
    )
  }

}

export default FileListContainer
