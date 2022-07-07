import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <div className="footer py-5">
        <Container>
          <Row>
            <div className="d-flex align-items-center justify-content-between">
              <img
                className="img-header"
                src="../images/logo2.png"
                alt="nofile"
              />{" "}
              <h3>Menu</h3> <h3>More</h3>
            </div>
          </Row>
          <div className="pt-5 d-flex flex-row justify-content-between">
            <div>
              <div className="d-flex flex-column">
                <p className="p1">Email: abc@gmail.com</p>
                <p className="p2">Hotline: +84 0333 444 999</p>
                <p className="p3">Working Time: 8:00 - 23:00</p>
              </div>
            </div>
            <div>
              <div className="d-flex flex-column">
                <p className="p1">Product</p>
                <p className="p2">Brand</p>
                <p className="p3">Store</p>
              </div>
            </div>
            <div>
              <div className="d-flex flex-column">
                <p className="p1">More info...</p>
                <p className="p2">Services</p>
                <p className="p3">About</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
