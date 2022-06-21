import { Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "../../components/BreadCrum";
import { AbsoluteHeader, ButtonPrimaryContained } from "../SingleProduct";
import "./index.scss";
export const LabelStyled = styled(Form.Label)((props) => ({
  color: `${props.theme.colors.main2}`,
  fontFamily: '"Lato", sans-serif',
}));
const Checkout = () => {
  const { data, refetch, error } = useUserQuery();
  return (
    <>
      <AbsoluteHeader></AbsoluteHeader>
      <Breadcrumb breadcrumb={"checkout"}></Breadcrumb>
      <Container>
        <Row className="checkout mt-5">
          <Col md={6} sm={12}>
            <h2 className="mb-4 title">Billing Details</h2>
            <Form style={{ color: "#4c4c4c" }} className="checkout_form">
              <Row className="mb-3">
                <Col>
                  {" "}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <LabelStyled>Full name</LabelStyled>
                    <Form.Control type="text" placeholder="Enter Fullname" />
                    <Form.Text className="text-muted">
                      Enter your fullname
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <LabelStyled>Email address</LabelStyled>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group className="mb-3">
                    <LabelStyled>Address</LabelStyled>
                    <Form.Control type="text" placeholder="Enter address" />
                    <Form.Text className="text-muted">
                      Enter your address
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  {" "}
                  <Form.Group className="mb-3">
                    <LabelStyled>Phone Number</LabelStyled>
                    <Form.Control type="number" placeholder="Enter phone" />
                    <Form.Text className="text-muted">
                      Enter your phone number
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <div className="mb-3">
                <h4>Additional information</h4>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <LabelStyled>Order Notes</LabelStyled>
                  <Form.Control
                    as="textarea"
                    rows={7}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                  />
                </Form.Group>
              </div>
            </Form>
          </Col>
          <Col md={6} sm={12}>
            {" "}
            <h2 className="mb-4 title">Your Order</h2>
            <div className="checkout_form">
              <Row className="d-flex text-center pb-5">
                <Col>
                  <LabelStyled>Product</LabelStyled>
                  {/* <h4 className="w-100%">Product</h4> */}
                </Col>
                <Col>
                  <LabelStyled>Total</LabelStyled>
                  {/* <h4 className="w-100%">Total</h4> */}
                </Col>
              </Row>
              <Row className="text-center">
                <Col>
                  <p>
                    sua rua mat<span> x 2</span>
                  </p>
                </Col>
                <Col>
                  <p>13.000 đ</p>
                </Col>
              </Row>
              <Divider variant="middle" />
              <Row className="text-center pt-3">
                <Col>
                  <p>
                    sua rua mat<span> x 2</span>
                  </p>
                </Col>
                <Col>
                  <p>13.000 đ</p>
                </Col>
              </Row>
              <Divider variant="middle" />
              <Row className="text-center">
                <Col>
                  <p>
                    sua rua mat<span> x 2</span>
                  </p>
                </Col>
                <Col>
                  <p>13.000 đ</p>
                </Col>
              </Row>
              <Divider variant="middle" />
              <Row className="text-center pt-3">
                <Col>
                  <h3 style={{ color: "#ff536f" }}>Order Total</h3>
                </Col>
                <Col>
                  <p className="text-info">13.0000đ</p>
                </Col>
              </Row>
              <Divider variant="middle" />
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
              <ButtonPrimaryContained fullWidth className="mt-4 py-3">
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
