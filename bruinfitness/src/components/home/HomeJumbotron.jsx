import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./HomeJumbotron.css";
import "../common/button.css";

function HomeJumbotron() {
  return (
    <Jumbotron fluid>
      <div className="flex-jumbotron">
        <div className="three-fourths-col">
          <p>
            Good workouts start with good programming. Bruin Fitness provides
            training for all of your goals, whether it be enhancing your
            CrossFit, gymnastic, or weightlifting skills. Our trainers are
            always ready to help. Get in touch today!
          </p>
        </div>
        <div className="one-fourths-col">
          <a href="/contact">
            <button type="button" className="btn btn-outline-secondary btn-lg">
              Contact Us
            </button>
          </a>
        </div>
      </div>
    </Jumbotron>
  );
}

export default HomeJumbotron;
