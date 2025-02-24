import React from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import "./MainNavigation.css";

class MainNavigation extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {(context) => {
          return (
            <header className="main-navigation">
              <div className="main-navigation__logo">
                <h1>EclecticEvent</h1>
              </div>
              <nav className="main-navigation__items">
                <ul>
                  {!context.token && (
                    <li>
                      <NavLink to="/auth">Authenticate</NavLink>
                    </li>
                  )}

                  <li>
                    <NavLink to="/events">Events</NavLink>
                  </li>
                  {context.token && (
                      <React.Fragment>
                    <li>
                      <NavLink to="/bookings">My Bookings</NavLink>
                    </li>
                    <li>
                        <button onClick={context.logout}> Logout </button>
                    </li>
                    </React.Fragment>
                  )}
                </ul>
              </nav>
            </header>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default MainNavigation;
