import React, { useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import FileListContainer from './components/FileList/FileListContainer'
import FileUploadContainer from './components/FileUploads/FileUploadContainer'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: null,
		};

	}

	componentDidMount() {
		this.setState({
			view: "upload"
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
						<FileListContainer />
					</div>

				) : (

				<div>
						<button value="files" onClick={this.switchView}>Switch View: Song List </button>

				<FileUploadContainer />

				</div>
			)
		}
	</div>
	)
}
	}

		export default App;
