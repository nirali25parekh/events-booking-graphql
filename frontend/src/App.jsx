import React from "react";
import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";
import MainNavigation from "./components/navigation/MainNavigation";

import "./App.css";
import AuthContext from "./context/AuthContext";

class App extends React.Component {
  state = {
    token: null,
    userId: null,
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };


  render() {
    return (
      <AuthContext.Provider
       value={{
        token: this.state.token,
        userId: this.state.userId,
        login: this.login,
        logout: this.logout
      }}>
        <BrowserRouter>
          <div className="container">
            <MainNavigation />
            <main className="main-content">
              {/* Switch means picks the first one out of all these checked in order */}
              <Switch>
                {/* exact means when its exactly '/', not when ,/events or anything */}
                {!this.state.token && <Redirect from="/" to="/auth" exact />}
                {this.state.token && <Redirect from="/" to="/events" exact />}
                {this.state.token && <Redirect from="/auth" to="/events" exact />}

                {!this.state.token && (
                  <Route path="/auth" component={AuthPage} />
                )}

                <Route path="/events" component={EventsPage} />
                
                {this.state.token && (
                  <Route path="/bookings" component={BookingsPage} />
                )}
              </Switch>
            </main>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

export default App;
