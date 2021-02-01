import React from 'react';
import fadeInUp from "react-animations/lib/fade-in-up";
import styled, { keyframes } from "styled-components";

const fadeInUpAnimation = keyframes`${fadeInUp}`;

const FadeInUpDiv = styled.div`
  animation: 1s ${fadeInUpAnimation} !important;
`;

function WebPageHeader({header, additionalClassNames}) {
    return (
        <FadeInUpDiv style={{paddingBottom: "1rem", paddingTop: "1rem"}}>
          <h1 className={`pageHeader ${additionalClassNames}`}>{header}</h1>
        </FadeInUpDiv>
    )
}

export default WebPageHeader
