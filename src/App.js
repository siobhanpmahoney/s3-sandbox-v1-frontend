import React, { useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDropzone } from 'react-dropzone';
import MyDropzone from './MyDropzone';
import MyDropzone2 from './MyDropzone2';
import FileList from './components/FileList'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: null,
			example: {},
			files: [],
		};
		this.fileInput = React.createRef();
		this.onAddFileData = this._onAddFileData.bind(this);
	}

	componentDidMount() {
		this.setState({
			view: null
		})
	}

	switchView = (event) => {
		let val = event.target.value

		this.setState({
			view: val
		})

	}

	addFileToState = file => {
		let stateFiles = [...this.state.files, file];
		this.setState({
			files: stateFiles,
		});
	};

	_onAddFileData = event => {
		const file = this.fileInput.current.files[0];
		const reader = new FileReader();

		let fileUploadState = this.state.files.splice(0);
		fileUploadState = [...this.fileInput.current.files];
		console.log('fileUploadState', fileUploadState);

		reader.onloadend = () => {
			this.setState({
				example: { url: reader.result },
				files: fileUploadState,
			});
			// this.setState({
			//   files:
			// })
		};

		if (file) {
			reader.readAsDataURL(file);
			let url = reader.result;
			this.setState(
				{
					example: { url: url },
					files: fileUploadState,
				},
				console.log('state?'),
				this.state
			);
		}
		let name = event.target.name;
		let value = event.target.value;
		let ex = Object.assign({}, this.state.example);
		ex[name] = value;
		this.setState(
			{
				example: ex,
			},
			console.log(ex)
		);
	};

	sendToS3 = event => {
		event.preventDefault();
		let formdata = new FormData();

		formdata.append('song_id', '1');
		formdata.append('file', this.state.files[0]);

		fetch('http://localhost:3000/api/v1/versions', {
			method: 'POST',
			body: formdata,
		})
		.then(rez => rez.json())
		.then(j => console.log(j));
		//   })
		// })
	};

	render() {
		console.log('state: ', this.state);
		return (
			<div>
				{this.state.view !== "upload" ? (
					<div>
						<button onClick={this.switchView} value="upload">Switch View: Upload</button>
						<FileList />
					</div>


				) : (
					<div>
						<div>
							<button value="files" onClick={this.switchView}>Switch View: Song List </button>
							<h3>Vanilla HTML form</h3>

							<form onSubmit={this.sendToS3}>
								<input onChange={this.onAddFileData} type="file" name="file" ref={this.fileInput} multiple />
								<button type="submit">Fake Submit</button>
							</form>
						</div>

						<hr />
						<div>
							<h3>Dropzone 1:</h3>
							<MyDropzone addFileToState={this.onAddFileData} />
						</div>

						<hr />

						<div>
							<h3>Dropzone 1:</h3>
							<MyDropzone2 addFileToState={this.addFileToState} />
						</div>
					</div>
					)
				}


				</div>
			)}
		}

		export default App;
