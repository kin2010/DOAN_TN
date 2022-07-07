import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "../../components/Product";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
const HotPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const pds = useSelector((state) => state.products.products);
  const [pd, setPd] = useState();
  useEffect(() => {
    if (pds) {
      setPd(Object.values(pds));
    }
  }, [pds]);
  return (
    <div>
      <h2 className="top text-center">Hot Product</h2>
      <div className="bg pt-5">
        <Container>
          <Slider {...settings}>
            {!!pds &&
              Object.values(pds).map((p, index) => (
                <Product key={index} product={p} />
              ))}
          </Slider>
        </Container>
      </div>
    </div>
  );
};

export default HotPage;
