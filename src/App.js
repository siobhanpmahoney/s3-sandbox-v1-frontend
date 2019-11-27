import React, { useCallback } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar'
import FileListContainer from './components/FileList/FileListContainer'
import FileUploadContainer from './components/FileUploads/FileUploadContainer'
import {fetchAlbums, fetchSongs} from './service'
import Loader from './components/utils/Loader'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: null,
			albumData: null,
			songData: null,
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
		if (!this.state.albumData || !this.state.songData) {
			return (
				<div className="app">
					<Loader />
				</div>
			)
		} else {
			return (
				<div className="app">
					<NavBar />
					<Switch>
						<Route exact path="/admin/upload" render={(routerProps) => {
								return <FileUploadContainer history={routerProps.history} albumData={this.state.albumData} songData={this.state.songData} _legacyMusicData={this.state._legacyMusicData || []} />
							}} />

						<Route exact path="/admin/manage" render={(routerProps) => {
								return <FileListContainer history={routerProps.history} albumData={this.state.albumData} songData={this.state.songData} _legacyMusicData={this.state._legacyMusicData || []} />
							}} />

						<Route exact path="/app" render={(routerProps) => {
									return <FileListContainer history={routerProps.history} albumData={this.state.albumData} songData={this.state.songData} _legacyMusicData={this.state._legacyMusicData || []} />
								}} />


					</Switch>
				</div>
			)
		}
	}
	}

		export default App;
