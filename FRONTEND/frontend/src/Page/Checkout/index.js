import { Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserQuery } from "../../app/AuthApi";
import Breadcrumb from "../../components/BreadCrum";
import { createOrder } from "../../Slice/OrderSlice";
import { formatNumber } from "../../Utils/func";
import { AbsoluteHeader, ButtonPrimaryContained } from "../SingleProduct";
import "./index.scss";
export const LabelStyled = styled(Form.Label)((props) => ({
  color: `${props.theme.colors.main2}`,
  fontFamily: '"Lato", sans-serif',
}));
const Checkout = () => {
  const dispatch = useDispatch();
  const { data, refetch, error } = useUserQuery();
  const carts = useSelector((state) => state.carts.carts);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (carts.length > 0) {
      let total = 0;
      carts.map((item) => {
        total += item.product.price * item.quantity;
      });
      setTotal(total);
    }
  }, [data]);
  const [formValue, setFormvalue] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    note: "",
  });
  const handleFormChange = (e) => {
    setFormvalue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    console.log(formValue);
    const products = [];
    carts.map((cart) => {
      for (let i = 0; i < cart.quantity; i++) {
        products.push(cart?.product._id);
      }
    });

    const req = {
      totalPrice: total || 0,
      deliveryAddress: formValue?.address || "",
      product: products || [],
      user: data?._id || "",
      currentAddress: data?.address || "",
      status: "pending",
    };

    const res = await dispatch(createOrder(req));
    const rs = unwrapResult(res);
    console.log(res, rs);
    navigate(`/order/${rs._id}`);
  };
  useEffect(() => {
    setFormvalue({
      ...formValue,
      fullName: data?.fullName || "",
      email: data?.email || "",
      address: data?.address || "",
      phone: data?.phone || "",
    });
  }, [data]);
  return (
    <>
      <AbsoluteHeader></AbsoluteHeader>
      <Breadcrumb breadcrumb={"checkout"}></Breadcrumb>
      <Container>
        <Row className="checkout mt-5">
          <Col md={7} sm={12}>
            <h2 className="mb-4 title">Billing Details</h2>
            <Form style={{ color: "#4c4c4c" }} className="checkout_form">
              <Row className="mb-3">
                <Col md={12} sm={6}>
                  {" "}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <LabelStyled>Full name</LabelStyled>
                    <Form.Control
                      name="fullName"
                      onChange={handleFormChange}
                      type="text"
                      value={formValue.fullName}
                      placeholder="Enter Fullname"
                    />
                    <Form.Text className="text-muted">
                      Enter your fullname
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={12} sm={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <LabelStyled>Email address</LabelStyled>
                    <Form.Control
                      name="email"
                      onChange={handleFormChange}
                      type="email"
                      placeholder="Enter email"
                      value={formValue.email}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={12} sm={6}>
                  <Form.Group className="mb-3">
                    <LabelStyled>Address</LabelStyled>
                    <Form.Control
                      name="address"
                      onChange={handleFormChange}
                      type="text"
                      placeholder="Enter address"
                      value={formValue.address}
                    />
                    <Form.Text className="text-muted">
                      Enter your address
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={12} sm={6}>
                  {" "}
                  <Form.Group className="mb-3">
                    <LabelStyled>Phone Number</LabelStyled>
                    <Form.Control
                      name="phone"
                      onChange={handleFormChange}
                      type="number"
                      placeholder="Enter phone"
                      value={formValue.phone}
                    />
                    <Form.Text className="text-muted">
                      Enter your phone number
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3"></Row>
              <div className="mb-3">
                <h4>Additional information</h4>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <LabelStyled>Order Notes</LabelStyled>
                  <Form.Control
                    name="note"
                    onChange={handleFormChange}
                    as="textarea"
                    value={formValue.note}
                    rows={7}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                  />
                </Form.Group>
              </div>
            </Form>
          </Col>
          <Col md={5} sm={12}>
            {" "}
            <h2 className="mb-4 title">Your Order</h2>
            <div className="checkout_form">
              <Row className="d-flex text-center pb-5">
                <Col>
                  <LabelStyled style={{ textAlign: "start" }}>
                    Product
                  </LabelStyled>
                  {/* <h4 className="w-100%">Product</h4> */}
                </Col>
                <Col className="text-right">
                  <LabelStyled style={{ textAlign: "end" }}>Total</LabelStyled>
                  {/* <h4 className="w-100%">Total</h4> */}
                </Col>
              </Row>
              <Divider variant="middle mb-2 bg-primary" />
              {/* <Row className="text-center pt-3"> */}
              {carts.length > 0 &&
                carts.map((cart, index) => (
                  <>
                    <Row className="" key={index}>
                      <Col className="fm text-start">
                        <p className="fm" style={{ fontSize: "17px" }}>
                          {cart?.product?.name}
                          <span className="text-primary">
                            {" "}
                            x <strong>{cart?.quantity}</strong>
                          </span>
                        </p>
                      </Col>
                      <Col>
                        <p className="text-success text-right">
                          {formatNumber(
                            cart?.product?.price * cart?.quantity
                          ) || 0}{" "}
                          đ
                        </p>
                      </Col>
                    </Row>
                    <Divider variant="middle mb-2" />
                  </>
                ))}
              {/* </Row> */}
              <Row className="text-center pt-3"></Row>
              {/* <Divider variant="middle" /> */}

              <Row className="text-center pt-3">
                <Col>
                  <h3 style={{ color: "#ff536f" }}>Order Total</h3>
                </Col>
                <Col>
                  <p className="text-info">
                    {new Intl.NumberFormat().format(total)}
                  </p>
                </Col>
              </Row>
              {/* <Divider variant="middle" /> */}
            </div>
            <div className="checkout_form mt-5">
              <h3 className="mb-4">Payment Method</h3>
              <div>
                <div className="d-flex align-items-center">
                  <input type="radio" value="paypal" name="method" />
                  <p style={{ height: "20px", marginLeft: "15px" }}>Paypal</p>
                </div>
                <div className="d-flex align-items-center">
                  <input type="radio" value="momo" name="method" />
                  <p style={{ height: "20px", marginLeft: "15px" }}>Momo</p>
                </div>
              </div>
              <ButtonPrimaryContained
                fullWidth
                className="mt-4 py-3"
                onClick={handleSubmit}
              >
                PLACE ORDER
              </ButtonPrimaryContained>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Checkout;
