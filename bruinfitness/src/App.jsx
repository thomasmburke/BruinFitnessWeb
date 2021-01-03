import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./components/about/About";
import Footer from "./components/common/Footer";
import NavigationBar from "./components/common/NavigationBar";
import Contact from "./components/contact/Contact";
import Home from "./components/home/Home";
import Pricing from "./components/pricing/Pricing";
import Schedule from "./components/schedule/Schedule";
import SignInForm from "./components/signin-form/SignInForm";
import Team from "./components/team/Team";
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
                <Team />
              </Route>
              <Route path="/schedule">
                <Schedule />
              </Route>
              <Route path="/pricing">
                <Pricing />
              </Route>
              <Route path="/contact">
                <Contact />
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
