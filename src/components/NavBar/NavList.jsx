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
        <div className={`nav__list-item${ match ? ' nav__list-item--active': '' }`}>
          <Link className="nav__list-item__link" to={to}>{children}</Link>
        </div>
      )}
    />
  )
}

const NavList = ({ list, logOutCurrentUser, isLoggedIn, type }) => {
  return (
    <div className="nav__list" id={type}>
      <div className="nav__list__wrapper">
        { list.map(({ text, to }) => (
          <NavListItem key={text} to={to}>
            { text }
          </NavListItem>
        ))}



      {type == "admin" &&
        <div key={"logout"} className={`nav__list-item logOut`} id={`nav__list-item__logOut`} onClick={logOutCurrentUser}>

          <div className="nav__list-item__link">Logout</div>

        </div>

      }
      </div>
    </div>
  )
}


export default NavList
