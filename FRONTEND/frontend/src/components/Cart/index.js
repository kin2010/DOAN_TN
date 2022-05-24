import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ImgStyle } from '../Header';
import './index.scss';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
export const CartButton = styled(Button)((props) => ({
  padding: '7px',
  backgroundColor: `${props.theme.colors.secondary}`,
  borderRadius: '100rem',
  color: '#fff',
  fontWeight: 700,
  minWidth: 0,
  ':hover': {
    backgroundColor: '#fff',
    color: `${props.theme.colors.secondary}`,
    border: `1px solid ${props.theme.colors.secondary}`,
  },
}));
export const BtnFooter = styled(CartButton)((props) => ({}));
const Cart = () => {
  const carts = useSelector((state) => state.carts.carts);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    console.log('change');
    if (carts.length > 0) {
      const totals = Object.values(carts).reduce((init, total) => {
        return init + total.product.price * total.quantity;
      }, 0);
      console.log(Object.values(carts), totals);
      setTotal(totals);
    }
  }, [carts]);
  return (
    <div className="shopping-cart-content bg-white pb-3">
      <div
        style={{ width: 'fit-content', marginLeft: 25, marginTop: 25 }}
        className="ml-1 bg-info rounded-circle px-2 py-1 mt-2 text-white  "
      >
        <i className="fas fa-chevron-up"></i>
      </div>
      <div className="pb-3 pt-2 cart-content">
        {carts &&
          Object.values(carts).map((cart, index) => (
            <Row className="py-2" key={index}>
              <Row className="pb-1">
                <Col md={4}>
                  <ImgStyle src={cart?.product?.avatar} alt="cartImage" />
                </Col>
                <Col md={8} style={{ paddingLeft: '40px' }}>
                  <Row>{cart?.product?.name} </Row>
                  <Row style={{ color: '#7f868d' }} className="text-dark">
                    <span>
                      {Number.parseInt(
                        cart?.product?.price * cart?.quantity,
                      ).toLocaleString() || 0}
                      đ{' '}
                    </span>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Row className="d-flex justify-content-between align-items-center ">
                        <CartButton>
                          <ChevronLeftIcon />
                        </CartButton>
                        {cart?.quantity}
                        <CartButton>
                          <ChevronRightIcon />
                        </CartButton>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Divider variant="fullWidth" className="w-100" />
            </Row>
          ))}
      </div>
      <Row
        style={{ width: '90%' }}
        className="d-flex text-primary justify-content-between mx-auto pt-2"
      >
        <span>Total</span>
        <span>{total} đ</span>
      </Row>
      <Row style={{ width: '90%' }} className=" mx-auto pt-1">
        <Button style={{ width: '100%' }} className="mb-2" variant="contained">
          VIEW CARD
        </Button>
        <Button style={{ width: '100%' }} variant="contained">
          CHECKOUT
        </Button>
      </Row>
    </div>
  );
};

export default Cart;
