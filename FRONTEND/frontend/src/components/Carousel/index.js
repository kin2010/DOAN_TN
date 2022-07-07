import React from "react";
import { Carousel } from "react-bootstrap";

const Slider = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="img-slider d-block w-100"
            src="../images/slide1.jfif"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 style={{ color: "#c6596b" }}>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="img-slider d-block w-100"
            src="../images/slide2.png"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3 style={{ color: "#c6596b" }}>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="img-slider d-block w-100"
            src="../images/slide3.png"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3 style={{ color: "#c6596b" }}>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
