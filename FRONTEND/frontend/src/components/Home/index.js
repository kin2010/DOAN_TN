import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Product from '../Product';
import Header from '../Header';

const Home = () => {
  return (
    <>
      <Header></Header>
      <Container style={{ backgroundColor: '#f6f7fb' }}>
        <Row>
          <Col md={4}>
            <Product
              chip="sale"
              name="Kem chống năng số 1"
              trademark="Dior"
              rating={3.5}
              src="../images/img1.png"
            ></Product>
          </Col>
          <Col md={4}>
            <Product
              chip="hot"
              name="Kem chống năng số 1"
              trademark="Dior"
              rating={3.5}
              price={80000}
              src="../images/img2.png"
            ></Product>
          </Col>
          <Col md={4}>
            <Product
              chip="new"
              name="Kem chống năng số 1"
              trademark="Dior"
              price={1030000}
              rating={3.5}
              src="../images/img3.png"
            ></Product>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
