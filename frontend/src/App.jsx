import React from "react";
import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";
import MainNavigation from "./components/navigation/MainNavigation";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <MainNavigation />
        <main className="main-content">
          {/* Switch means picks the first one out of all these checked in order */}
          <Switch>
            {/* exact means when its exactly '/', not when ,/events or anything */}
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={AuthPage} />
            <Route path="/events" component={EventsPage} />
            <Route path="/bookings" component={BookingsPage} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
