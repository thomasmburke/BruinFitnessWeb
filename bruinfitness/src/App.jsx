import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./components/about/About";
import Footer from "./components/common/Footer";
import NavigationBar from "./components/common/NavigationBar";
import Home from "./components/home/Home";
import Schedule from "./components/schedule/Schedule";
import SignInForm from "./components/signin-form/SignInForm";
import "./index.css";
import MyProvider from "./providers/MyProvider";

function App() {
  return (
    <MyProvider>
      {/* <React.Fragment> */}
      <div className="content-holder">
        <NavigationBar />
        <div className="content">
        <Router>
          {/* <div className="app"> */}
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/team">
                <h1>Team</h1>
              </Route>
              <Route path="/schedule">
                <Schedule />
              </Route>
              <Route path="/pricing">
                <h1>Pricing</h1>
              </Route>
              <Route path="/contact">
                <h1>Contact</h1>
              </Route>
              <Route path="/login">
                <SignInForm />
              </Route>
              {/* default route & Home page */}
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          {/* </div> */}
        </Router>
        </div>
        <Footer />
      </div>
      {/* </React.Fragment> */}
    </MyProvider>
  );
}

export default App;
