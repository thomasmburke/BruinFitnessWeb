import React from 'react';
import fadeInUp from "react-animations/lib/fade-in-up";
import styled, { keyframes } from "styled-components";

const fadeInUpAnimation = keyframes`${fadeInUp}`;

const FadeInUpDiv = styled.div`
  animation: 1s ${fadeInUpAnimation} !important;
`;

function TeamHeader() {
    return (
        <FadeInUpDiv><h1>Our Team</h1></FadeInUpDiv>
    )
}

export default TeamHeader
