import React, { useCallback } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import NavBar from './components/NavBar/NavBar'
import FileListContainer from './components/FileList/FileListContainer'
import FileUploadContainer from './components/FileUploads/FileUploadContainer'
import ShufflerAppContainer from './components/ShufflerApp/ShufflerAppContainer'
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

	// fetchAlbumsForState = () => {
	// 	return fetchAlbums()
	// 	.then(json => {
	// 		return json
	// 	})
	// }
	//
	// fetchSongsForState = () => {
	// 	return fetchSongs()
	// 	.then(json => {
	// 		return json
	// 	})
	// }

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


					<NavBar logOutCurrentUser={this.logOutCurrentUser}/>
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

						<Route exact path="/app" render={(routerProps) => {
									return <ShufflerAppContainer history={routerProps.history} />
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
