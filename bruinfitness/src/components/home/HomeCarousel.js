import React from "react";
import Carousel from "react-bootstrap/Carousel";
// import Container from "react-bootstrap/Container";
import "./HomeCarousel.css";
import "../common/button.css";
import ScrollAnimation from "react-animate-on-scroll";
// import fadeInUp from "react-animations/lib/fade-in-up";
import fadeInRight from "react-animations/lib/fade-in-right";
// import { fadeInRight } from "react-animations";
import styled, { keyframes } from "styled-components";

const fadeInAnimation = keyframes`${fadeInRight}`;
const FadeInDiv = styled.div`
  animation: 1s ${fadeInAnimation} !important;
`;

function HomeCarousel() {
  return (
    <div>
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
            <FadeInDiv>
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
            </FadeInDiv>
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
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/crossfit_banner_stock_image.jpg"
            alt=""
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <FadeInDiv>
        <h1>Hi Margaux</h1>
      </FadeInDiv>
    </div>
  );
}

export default HomeCarousel;
