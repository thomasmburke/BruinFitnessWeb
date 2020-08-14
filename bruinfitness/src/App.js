import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";

function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Router>
        <div className="app">
          <Switch>
            {/* About page bruinfitness.com/about */}
            <Route path="/about">
              <h1>About</h1>
            </Route>
            {/* Team page bruinfitness.com/team */}
            <Route path="/team">
              <h1>Team</h1>
            </Route>
            {/* Schedule page bruinfitness.com/schedule */}
            <Route path="/schedule">
              <h1>Schedule</h1>
            </Route>
            {/* Pricing page bruinfitness.com/pricing */}
            <Route path="/pricing">
              <h1>Pricing</h1>
            </Route>
            {/* Contact page bruinfitness.com/contact */}
            <Route path="/contact">
              <h1>Contact</h1>
            </Route>
            {/* default route & Home page */}
            {/* Home page bruinfitnes.com/ */}
            <Route path="/">
              <h1>Home</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
