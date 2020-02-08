import React, { useCallback } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import NavBar from './components/NavBar/NavBar'
import FileListContainer from './components/FileList/FileListContainer'
import FileUploadContainer from './components/FileUploads/FileUploadContainer'
import ShufflerAppContainer from './components/ShufflerApp/ShufflerAppContainer'
import AlbumSelectionContainer from './components/ShufflerApp/AlbumSelectionContainer'
import TrackPlayerContainer from './components/ShufflerApp/Playlist/TrackPlayerContainer'

import {fetchAlbums, fetchSongs} from './service'
import Loader from './components/utils/Loader'
import ls from 'local-storage'

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import {removeCurrentUserAction, fetchAlbumDataAction, fetchSongDataAction} from './actions'


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: null,
			// albumData: null,
			// songData: null
		};

	}

	logOutCurrentUser = () => {
		if (ls.get('jwt_token')) {
			ls.remove('jwt_token')
			this.props.removeCurrentUserAction()
			return this.renderNav()
		}
	}

	componentDidMount() {
		this.props.fetchAlbumDataAction()
		this.props.fetchSongDataAction()
		// this.fetchAlbumsForState()
		// .then(res => this.setState({
		// 	view: "upload",
		// 	albumData: res
		// }))
		// .then(x => this.fetchSongsForState())
		// .then(results => this.setState({
		// 	songData: results
		// }))
	}

	componentDidUpdate(prevProps) {


		if (prevProps.songs.length != this.props.songs.length) {
			console.log("prevProps: ", prevProps.songs.length)
			console.log("props.songs.length: ", this.props.songs.length)
			this.props.fetchSongDataAction()
		}

	}

	renderNav = () => {
		return <NavBar jwt={ls.get('jwt_token')} logOutCurrentUser={this.logOutCurrentUser} />
	}

	switchView = (event) => {
		let val = event.target.value
		this.setState({
			view: val
		})
	}



	render() {

		if (!this.props.albums || !this.props.songs) {
			return (
				<div className="app">
					<Loader />
				</div>
			)
		} else {
			return (
				<div className="app">


					{this.renderNav()}
					<Switch>

						<Route exact path='/login' render={(routerProps) => {
								return <Login history={routerProps.history} />
							}} />

						<Route exact path="/admin/upload" render={(routerProps) => {
								return <FileUploadContainer history={routerProps.history} />
							}} />

						<Route exact path="/admin/manage" render={(routerProps) => {
								return <FileListContainer history={routerProps.history} />
							}} />

						<Route exact path="/" render={(routerProps) => {
										return <ShufflerAppContainer history={routerProps.history} />
									}} />

						<Route exact path="/music" render={(routerProps) => {
								return <AlbumSelectionContainer history={routerProps.history} />
							}} />

						<Route path="/playlist/album=:albumId" render={(routerProps) => {
								return <TrackPlayerContainer albumId={routerProps.match.params.albumId} albumApp={this.props.albums.find((album) => routerProps.match.params.albumId == album.id)} history={routerProps.history} songParams={routerProps.match.params.songParams} />
							}} />



						<Redirect to='/' />


					</Switch>
				</div>
			)
		}
	}
}

function mapStateToProps(state, props) {
	  return {
	    user: state.user,
			albums: state.albums,
			songs: state.songs
	  }
	}

function mapDispatchToProps(dispatch) {
	  return bindActionCreators({removeCurrentUserAction,fetchAlbumDataAction, fetchSongDataAction}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
