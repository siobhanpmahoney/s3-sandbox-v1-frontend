import React from 'react'
import { Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



const NavListItem = ({ to, children }) => {
  return (
    <Route
      path={to}
      exact
      children={({ match }) => (
        <li className={`nav__list-item${ match ? ' nav__list-item--active': '' }`}>
          <Link className="nav__list-item__link" to={to}>{children}</Link>
        </li>
      )}
    />
  )
}

const NavList = ({ list, logOutCurrentUser, isLoggedIn }) => {
  return (
    <ul className="nav__list">
      { list.map(({ text, to }) => (
        <NavListItem key={text} to={to}>
          { text }
        </NavListItem>
      ))}

      {!!isLoggedIn &&
        <button className={`nav__list-item`} onClick={logOutCurrentUser}>
          Log Out
        </button>
      }

    </ul>
  )
}


export default NavList
