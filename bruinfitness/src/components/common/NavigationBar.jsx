import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/NavBar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavigationBar.css";

function NavigationBar() {
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
            <Nav.Link>Contact</Nav.Link>
            <Nav.Link href="/login">Member SignIn</Nav.Link>
          </Nav>
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
}

export default NavigationBar;
