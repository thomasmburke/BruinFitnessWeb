import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/NavBar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthCheck, useAuth } from 'reactfire';
import "./NavigationBar.css";

const signOut = auth => auth.signOut().then(() => console.log('signed out'));

function NavigationBar() {

  const auth = useAuth();

  return (
    <NavBar bg="light" expand="md" sticky="top">
      <Container fluid>
        <NavBar.Brand href="/">
          <img
            src="/images/baseline_fitness_center_black_18dp.png"
            alt="BruinFitness logo"
          />
        </NavBar.Brand>
        <NavBar.Toggle aria-controls="basic-navbar-nav" />
        <NavBar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* renderMenuOnMount renders the menu in the DOM before the first time it is shown */}
            <NavDropdown
              title="About"
              id="nav-dropdown"
              renderMenuOnMount={true}
            >
              <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
              <NavDropdown.Item href="/team">Team</NavDropdown.Item>
              <NavDropdown.Item href="/FAQ">FAQ</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/schedule">Schedule</Nav.Link>
            <Nav.Link href="/pricing">Pricing</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <AuthCheck fallback={<Nav.Link href="/login">Member SignIn</Nav.Link>}>
              <div>
              {<Nav.Link onClick={() => signOut(auth)}>Sign Out</Nav.Link>}
              </div>
            </AuthCheck>
            
          </Nav>
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
}

export default NavigationBar;
