import React from 'react'
import SongListData from './SongListData'
import SongListDataWithAudio from './SongListDataWithAudio'

//songFile schema:

// [{
//   album_id: {
//     name: "album_name",
//     songs: [{
//       song_id: {
//         title: "song_name_1",
//         versions: [{
//           version_id: {
//             s3_key: "s3Key",
//             date: "date"
//           }
//         }]
//       }
//     }]
//   }}
// }]

class FileList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      view: null, // choices: Song List // Song List with Audio
      songListData: [], // schema:
      songFiles: {}
    }
  }

  componentDidMount() {
    this.setState({
      view: null,
      files: {}
    }, this.fetchSongData)
  }

  fetchSongData = () => {
    
    fetch("http://localhost:3000/api/v1/albums")
    .then(results => results.json())
    .then(json => {
      console.log(json)
      return this.setState({
        songListData: json
      })
  }
  )
  }

  selectViewOption = (event) => {
    let value = event.target.value
    this.setState({
      view: value
    })
  }

  render(){
    if (this.state.view == "audio") {
      return (
        <SongListDataWithAudio songListData={this.state.songListData} songFiles={this.state.songFiles} selectViewOption={this.selectViewOption} />
        )

      // eslint-disable-next-line eqeqeq
      } else if (this.state.view == "data") {
         return (
         <SongListData songListData={this.state.songListData} selectViewOption={this.selectViewOption} />
         )
      } else {
        return (
        <div>
          <h2>Pick a View</h2>
          <button onClick={this.selectViewOption} value="data">Song List</button>
          <button onClick={this.selectViewOption} value="audio">Song List with Audio</button>
        </div>
        )
        }
    }

}

export default FileList
