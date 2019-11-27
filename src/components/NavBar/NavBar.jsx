import React from 'react'
import NavList from './NavList'

const NavBar = (props) => {
  return (
    <nav className="nav">
      <NavList list={[
        { to: '/', text: 'Home'},
        { to: '/admin/upload', text: 'Upload'},
        { to: '/admin/manage', text: 'Manage'},
      ]}/>
    </nav>
  )
}

export default NavBar
