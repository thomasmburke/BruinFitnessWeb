import React from 'react';
import fadeInUp from "react-animations/lib/fade-in-up";
import styled, { keyframes } from "styled-components";
import "./WebPageHeaderWithBackgroundImage.css";

const fadeInUpAnimation = keyframes`${fadeInUp}`;

const FadeInUpDiv = styled.div`
  animation: 1s ${fadeInUpAnimation} !important;
`;

function WebPageHeaderWithBackgroundImage() {
    return (
        <section className="dnow-regionsWrap">
            <div className="dnow-regionsContent">
                <div className="card bg-dark text-white card-no-shadow">
                <img src="/images/crossfit_banner_stock_image_slim.png" alt="" />
                <div className="overlay-div"></div>
                <div
                    className="card-img-overlay d-flex align-items-center container justify-content-center"
                >
                    <div className="row mb-5">
                    <div className="col-sm-12">
                        <FadeInUpDiv>
                            <h2 className="card-title">
                                CONTACT US
                            </h2>
                        </FadeInUpDiv>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default WebPageHeaderWithBackgroundImage
