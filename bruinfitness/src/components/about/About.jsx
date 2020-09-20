import React from "react";
import AboutGoalPreface from "./AboutGoalPreface";
import AboutTwoColumn1 from "./AboutTwoColumn1";
import AboutTwoColumn2 from "./AboutTwoColumn2";
import "./About.css";

function About() {
  return (
    <div className="wrapper">
      <AboutGoalPreface />
      <AboutTwoColumn1 />
      <AboutTwoColumn2 />
    </div>
  );
}

export default About;
