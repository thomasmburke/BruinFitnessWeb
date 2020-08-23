import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Router>
        <div className="app">
          <Switch>
            <Route path="/about">
              <h1>About</h1>
            </Route>
            <Route path="/team">
              <h1>Team</h1>
            </Route>
            <Route path="/schedule">
              <h1>Schedule</h1>
            </Route>
            <Route path="/pricing">
              <h1>Pricing</h1>
            </Route>
            <Route path="/contact">
              <h1>Contact</h1>
            </Route>
            {/* default route & Home page */}
            <Route path="/">
              <h1>Home</h1>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </React.Fragment>
  );
}

export default App;
