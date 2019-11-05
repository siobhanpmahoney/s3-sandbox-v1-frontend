import React, { useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import {fetchAlbums, fetchSongs} from './service'
import FileListContainer from './components/FileList/FileListContainer'
import FileUploadContainer from './components/FileUploads/FileUploadContainer'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: null,
			albumData: [],
			songData: [],
			_legacyMusicData: []
		};

	}

	componentDidMount() {
		this.fetchAlbumsForState()
		.then(res => this.setState({
			view: "upload",
			albumData: res
		}))
		.then(x => this.fetchSongsForState())
		.then(results => this.setState({
			songData: results
		}))
	}

	fetchAlbumsForState = () => {
		return fetchAlbums()
		.then(json => {
			return json
		})
	}

	fetchSongsForState = () => {
		return fetchSongs()
		.then(json => {
			return json
		})
	}

	switchView = (event) => {
		let val = event.target.value
		this.setState({
			view: val
		})
	}



	render() {
		return (
			<div>
				{this.state.view !== "upload" ? (
					<div>
						<button onClick={this.switchView} value="upload">Switch View: Upload</button>
						<FileListContainer songListData={this.state._legacyMusicData || []}/>
					</div>

				) : (

				<div>
						<button value="files" onClick={this.switchView}>Switch View: Song List </button>

				<FileUploadContainer albumData={this.state.albumData} songData={this.state.songData} _legacyMusicData={this.state._legacyMusicData || []} />

				</div>
			)
		}
	</div>
	)
}
	}

		export default App;
