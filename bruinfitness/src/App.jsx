import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/common/NavigationBar";
import Footer from "./components/common/Footer";
import Home from "./components/home/Home";
import About from "./components/about/About";

function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Router>
        <div className="app">
          <Switch>
            <Route path="/about">
              <About />
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
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </React.Fragment>
  );
}

export default App;
