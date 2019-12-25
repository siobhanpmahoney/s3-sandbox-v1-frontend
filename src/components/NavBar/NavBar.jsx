import React from 'react'
import NavList from './NavList'
import ls from 'local-storage'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const NavBar = ({logOutCurrentUser}) => {

  const list = () => {
    return !!ls.get('jwt_token') ? (
      [
        { to: '/', text: 'Home'},
        { to: '/admin/upload', text: 'Upload'},
        { to: '/admin/manage', text: 'Manage'}
      ]
    ) : (
      [
        { to: '/', text: 'Home'}
      ]
    )
  }


     return (
       <nav className="nav">
         <NavList isLoggedIn={!!ls.get('jwt_token')} logOutCurrentUser={logOutCurrentUser} list={list()} />
       </nav>
     )


}

function mapStateToProps(state, props) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
