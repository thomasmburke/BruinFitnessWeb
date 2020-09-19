import React from "react";
import AboutGoalPreface from "./AboutGoalPreface";
import AboutTwoColumn1 from "./AboutTwoColumn1";
import "./About.css";

function About() {
  return (
    <React.Fragment>
      <AboutGoalPreface />
      <AboutTwoColumn1 />
      {/* <AboutTwoColumn2 /> */}
    </React.Fragment>
  );
}

export default About;
