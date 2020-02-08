import React from 'react'
import NavList from './NavList'
import ls from 'local-storage'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const NavBar = ({logOutCurrentUser, jwt}) => {

  const adminList = () => {
    return [
      { to: '/admin/upload', text: 'Upload'},
      { to: '/admin/manage', text: 'Manage'}
    ]
  }

  const list = () => {

    return [{ to: '/', text: 'Player'}]

  }


     return (
       <nav className="nav">
         {!!jwt &&
           <NavList logOutCurrentUser={logOutCurrentUser} logOutCurrentUser={logOutCurrentUser} list={adminList()} isLoggedIn={!!ls.get('jwt_token')} type="admin" />
         }
         <NavList isLoggedIn={!!ls.get('jwt_token')} logOutCurrentUser={logOutCurrentUser} list={list()} type="endUser" />
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
