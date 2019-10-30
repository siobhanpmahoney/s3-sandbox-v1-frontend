import React, { useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import {fetchAlbums} from './service'
import FileListContainer from './components/FileList/FileListContainer'
import FileUploadContainer from './components/FileUploads/FileUploadContainer'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: null,
			musicData: []
		};

	}

	componentDidMount() {
		this.fetchAlbumsForState()
		.then(res => this.setState({
			view: "upload",
			musicData: res
		}))
	}

	fetchAlbumsForState = () => {
		return fetchAlbums()
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
		console.log(this.state)
		return (
			<div>
				{this.state.view !== "upload" ? (
					<div>
						<button onClick={this.switchView} value="upload">Switch View: Upload</button>
						<FileListContainer songListData={this.state.musicData || []}/>
					</div>

				) : (

				<div>
						<button value="files" onClick={this.switchView}>Switch View: Song List </button>

				<FileUploadContainer musicData={this.state.musicData || []} />

				</div>
			)
		}
	</div>
	)
}
	}

		export default App;
