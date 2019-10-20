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
			preview: null
		};
		this.fileInput = React.createRef();
		this.onAddFileData = this._onAddFileData.bind(this);
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


	_onAddFileData = event => {

		let reader = new FileReader()
		reader.readAsDataURL(event.target.files[0])
		console.log(URL.createObjectURL(event.target.files[0]))


		this.setState({
			files: [...this.fileInput.current.files],
			preview: URL.createObjectURL(event.target.files[0]),
		});



		// const file = this.fileInput.current.files[0];



		// const reader = new FileReader();
		// reader.onloadend = () => {
			// this.setState({
			// 	// example: { url: reader.result },
			// 	files: fileUploadState,
			// 	preview: event.target.value,
			// });
			// this.setState({
			//   files:
			// })
		// };

		// if (file) {
		// 	reader.readAsDataURL(file);
		// 	let url = reader.result;
		// 	this.setState(
		// 		{
		// 			example: { url: url },
		// 			files: fileUploadState,
		// 		},
		// 		// console.log('state?'),
		// 		// this.state
		// 	);
		// }
		// let name = event.target.name;
		// let value = event.target.value;
		// let ex = Object.assign({}, this.state.example);
		//
		// // ex[name] = value;
		// console.log("ex", ex)
		// this.setState(
		// 	{
				// example: ex,
				// preview: URL.createObjectURL(value);

			// 	preview: value
			// },
			// console.log(URL.createObjectURL(value))
		// );
	};

	sendToS3 = event => {
		event.preventDefault();
		let formdata = new FormData();
		formdata.append('song_id', '2');
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

	renderPreview = () => {
		console.log(this.state.preview)

		return (
			<div>
				<audio controls>
					<source src={this.state.preview} type="audio/x-m4a" controls / >
				</audio>
			</div>
		)
	}

	render() {
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
								<button type="submit"> Submit</button>
							</form>
						</div>

						<hr />
						{!!this.state.preview &&
							<div>
								<h5>Upload Preview</h5>
								{this.renderPreview()}
							</div>
						}
					</div>
					)
				}


				</div>
			)}
		}

		export default App;
