import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthCheck } from "reactfire";
import "./App.css";
import About from "./components/about/About";
import Admin from "./components/admin/Admin";
import Footer from "./components/common/Footer";
import NavigationBar from "./components/common/NavigationBar";
import Contact from "./components/contact/Contact";
import FAQ from "./components/faq/FAQ";
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
      <div className="content-holder">
        <NavigationBar />
        <div className="content">
        <Router>
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/team">
                <Team />
              </Route>
              <Route path="/FAQ">
                <FAQ />
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
              <Route path="/admin">
                <AuthCheck fallback={<Home />}>
                {/* <AuthCheck fallback={<Home />} requiredClaims={{admin: true}}> */}
                  <Admin />
                </AuthCheck>
              </Route>
              {/* default route & Home page */}
              <Route path="/">
                <Home />
              </Route>
            </Switch>
        </Router>
        </div>
        <Footer />
      </div>
    </MyProvider>
  );
}

export default App;
