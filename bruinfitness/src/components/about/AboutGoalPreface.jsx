import React from "react";
import fadeInUp from "react-animations/lib/fade-in-up";
import styled, { keyframes } from "styled-components";

const fadeInUpAnimation = keyframes`${fadeInUp}`;

const FadeInUpDiv = styled.div`
  animation: 1s ${fadeInUpAnimation} !important;
`;

function AboutGoalPreface() {
  return (
    <FadeInUpDiv>
      <div>
        <h5 className="lead">
          <strong>Our Goal:</strong>
        </h5>
        <p>
          Bruin Fitness strives to build a community that is enthusiastic about
          getting in shape. Our coaches work hard to provide programming to get
          you in the best shape of your life. Come check out our gym to meet us
          in person and see all the equipment at your disposal. Our gym offers a
          mobile app to see what programming is coming for the week and cheer on
          your gym buddies.
        </p>
      </div>
    </FadeInUpDiv>
  );
}

export default AboutGoalPreface;
