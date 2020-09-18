import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./HomeCarousel.css";
import "../common/button.css";
// import ScrollAnimation from "react-animate-on-scroll";
import fadeInLeft from "react-animations/lib/fade-in-left";
import fadeInRight from "react-animations/lib/fade-in-right";
import fadeInUp from "react-animations/lib/fade-in-up-big";
import styled, { keyframes } from "styled-components";

const fadeInRightAnimation = keyframes`${fadeInRight}`;
const fadeInLeftAnimation = keyframes`${fadeInLeft}`;
const fadeInUpAnimation = keyframes`${fadeInUp}`;

const FadeInRightDiv = styled.div`
  animation: 1s ${fadeInRightAnimation} !important;
`;
const FadeInLeftDiv = styled.div`
  animation: 1s ${fadeInLeftAnimation} !important;
`;
const FadeInUpDiv = styled.div`
  animation: 1s ${fadeInUpAnimation} !important;
`;

function HomeCarousel() {
  return (
    <Carousel interval={50000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/crossfit_banner_stock_image.jpg"
          alt=""
        />

        {/* <ScrollAnimation
          animateIn="fadeIn"
          delay={1000}
          animateOnce={true}
          // scrollableParentSelector="div.carousel-caption"
          // animatePreScroll={true}
        > */}
        <Carousel.Caption id="test-caption">
          <FadeInRightDiv>
            <div className="flex-grid-right">
              <div className="col">
                <h3 className="font-weight-bold">STOP BY FOR A VISIT</h3>
                <p>
                  Stop by for a visit and get a free dropin workout so you can
                  check out the equipment and community.
                </p>
                <a className="btn btn-primary btn-lg" href="/contact">
                  Contact Us
                </a>
              </div>
            </div>
          </FadeInRightDiv>
        </Carousel.Caption>

        {/* </ScrollAnimation> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/crossfit_banner_stock_image.jpg"
          alt=""
        />
        <Carousel.Caption>
          <FadeInLeftDiv>
            <div className="flex-grid-left">
              <div className="col">
                <h3 className="font-weight-bold">FITNESS PROGRAMMING</h3>
                <p>
                  Our coaches a ready to provide programming to make you as fit
                  as possible!
                </p>
                <a className="btn btn-primary btn-lg" href="/team">
                  Meet Our Coaches
                </a>
              </div>
            </div>
          </FadeInLeftDiv>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/crossfit_banner_stock_image.jpg"
          alt=""
        />
        <Carousel.Caption>
          <FadeInUpDiv>
            <div className="flex-grid-center">
              <div className="col">
                <h3 className="font-weight-bold">"BE FIT. BE HAPPY."</h3>
                <p>
                  See what our customers are saying about our gym and personal
                  training staff.
                </p>
                <a className="btn btn-primary btn-lg" href="/about">
                  About Us
                </a>
                <a className="btn btn-primary btn-lg" href="/contact">
                  Contact Us
                </a>
              </div>
            </div>
          </FadeInUpDiv>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
