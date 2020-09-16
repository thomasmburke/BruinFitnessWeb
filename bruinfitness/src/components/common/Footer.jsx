import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Container from "react-bootstrap/Container";

function Footer() {
  return (
    <footer>
      <Container fluid>
        <div className="flex-grid-fourths">
          <div className="col text-center">
            <img src="/images/baseline_fitness_center_white_18dp.png" alt="" />
            <hr className="light" />
            <p>555-555-5555</p>
            <p>email@bruinfitness.com</p>
            <p>100 Street Name</p>
            <p>Brookline, MA, 02445</p>
          </div>
          <div className="col text-center">
            <h6>Our Hours</h6>
            <p>Mon-Sat: 5am-9pm</p>
            <p>Sunday: 6am-7pm</p>
          </div>
          <div className="col text-center social">
            <h6>Connect</h6>
            <a href="https://facebook.com/tom.burke.35513">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://facebook.com/tom.burke.35513">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://facebook.com/tom.burke.35513">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://facebook.com/tom.burke.35513">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
          <div className="col text-center">
            <h6>Terms</h6>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
            <p>Membership Terms</p>
            <p>Accessibility</p>
          </div>
        </div>
        <div className="flex-grid-single">
          <h6 className="footer__copy">&copy; bruinfitness.com</h6>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
