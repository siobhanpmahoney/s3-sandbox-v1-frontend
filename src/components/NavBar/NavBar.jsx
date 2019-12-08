import React from 'react'
import NavList from './NavList'
import ls from 'local-storage'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const NavBar = ({logOutCurrentUser}) => {
   if (!!ls.get('jwt_token')) {
     return (
       <nav className="nav">
         <NavList logOutCurrentUser={logOutCurrentUser} list={[
           { to: '/', text: 'Home'},
           { to: '/admin/upload', text: 'Upload'},
           { to: '/admin/manage', text: 'Manage'},
         ]}/>
       </nav>
     )
   } else {
     return <div></div>
   }
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
