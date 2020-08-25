import React from "react";
import Carousel from "react-bootstrap/Carousel";
// import Container from "react-bootstrap/Container";
import "./HomeCarousel.css";
import "../common/button.css";

function HomeCarousel() {
  return (
    <Carousel interval={50000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/crossfit_banner_stock_image.jpg"
          alt=""
        />
        <Carousel.Caption>
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
        </Carousel.Caption>
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
  );
}

export default HomeCarousel;
