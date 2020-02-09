import React from 'react'
import NavList from './NavList'
import ls from 'local-storage'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const NavBar = ({ user, logOutCurrentUser}) => {

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
         {!!user && user.id &&
           <NavList logOutCurrentUser={logOutCurrentUser} logOutCurrentUser={logOutCurrentUser} list={adminList()} isLoggedIn={!!user && user.id} type="admin" />
         }
         <NavList isLoggedIn={!!user && !!user.id} logOutCurrentUser={logOutCurrentUser} list={list()} type="endUser" />
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
