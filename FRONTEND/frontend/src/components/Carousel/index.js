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
            <h3 style={{ color: "#c6596b" }}>Mỹ phẩm Ecomestic</h3>
            <p>Với kinh nghiệm nhiều năm, đây là sự lựa chọn đúng đắn</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="img-slider d-block w-100"
            src="../images/slide2.png"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3 style={{ color: "#c6596b" }}>
              Sản phẩm mới luôn được cập nhật
            </h3>
            <p>Khách hàng luôn tin tưởng về chất lượng của chúng tôi</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="img-slider d-block w-100"
            src="../images/slide3.png"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3 style={{ color: "#c6596b" }}>Sale 30% vào mỗi cuối tuẩn</h3>
            <p>Hãy là người tiêu dùng thông minh</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
