import React, { useContext } from 'react';
import Header from '../Header';
import { Container, Row, Col } from 'react-bootstrap';
import Product from '../Product';
import { useSelector } from 'react-redux';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ShopDrop from './ShopDrop';
import Empty from '../Empty.js';
import './index.scss';
import CircularProgress from '@mui/material/CircularProgress';
import Breadcrumb from '../BreadCrum';
const Shop = () => {
  const categories = useSelector((state) => state.category.categories);
  const subs = useSelector((state) => state.category.subCategories);
  const products = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);

  let listCategories = '';
  listCategories = (
    <>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
      >
        {categories &&
          categories.map((cate, index) => (
            <ShopDrop cate={cate} key={index}></ShopDrop>
          ))}
      </List>
    </>
  );
  return (
    <>
      <Header></Header>
      <Breadcrumb breadcrumb="Shop"></Breadcrumb>
      <div style={{ backgroundColor: '#f9f9f9' }}>
        <Container>
          <Row style={{ backgroundColor: '#f9f9f9', paddingTop: '30px' }}>
            <Row style={{ width: '100%', marginBottom: '20px' }}>
              <Col md={3}></Col>
              <Col md={9} className="text-center">
                <img
                  style={{ width: 'inherit' }}
                  src="../images/shop1.png"
                  alt="nofile"
                />
              </Col>
            </Row>
            <Row style={{ width: '100%' }}>
              <Col md={3}>{listCategories}</Col>
              {isLoading === true ? (
                <Col md={9}>
                  <Row className="shop-content">
                    <CircularProgress
                      style={{ margin: '40px auto 0 auto' }}
                    ></CircularProgress>
                  </Row>
                </Col>
              ) : (
                <Col md={9}>
                  <Row className="shop-content">
                    {products.length > 0 ? (
                      products?.map((product, index) => (
                        <Col md={4} key={index}>
                          <Product
                            chip="sale"
                            name={product?.name}
                            rating={3.5}
                            src={product?.avatar}
                            trademark={product?.trademark?.name}
                          ></Product>
                        </Col>
                      ))
                    ) : (
                      <Empty />
                    )}
                  </Row>
                </Col>
              )}
            </Row>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Shop;
