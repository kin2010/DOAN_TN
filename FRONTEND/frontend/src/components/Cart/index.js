import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ImgStyle } from "../Header";
import "./index.scss";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { changeCart } from "../../Slice/CartSlice";
import { Navigate, useNavigate } from "react-router-dom";

export const CartButton = styled(Button)((props) => ({
  padding: "7px",
  backgroundColor: `${props.theme.colors.secondary}`,
  borderRadius: "100rem",
  color: "#fff",
  fontWeight: 700,
  minWidth: "inherit",
  ":hover": {
    backgroundColor: "#fff",
    color: `${props.theme.colors.secondary}`,
    border: `1px solid ${props.theme.colors.secondary}`,
  },
}));
export const BtnFooter = styled(Button)((props) => ({
  ":hover": {
    backgroundColor: "#fff",
    border: `1px solid ${props.theme.colors.info}`,
    color: `${props.theme.colors.info}`,
  },
}));
const Cart = ({ show }) => {
  const carts = useSelector((state) => state.carts.carts);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("change");
    if (carts.length > 0) {
      const totals = Object.values(carts).reduce((init, total) => {
        return init + total.product.price * total.quantity;
      }, 0);
      console.log(Object.values(carts), totals);
      setTotal(totals);
    }
  }, [carts]);
  const handleCart = (id, inc) => {
    console.log(id, inc);
    dispatch(changeCart({ productId: id, increase: inc }));
  };
  return (
    <div className="shopping-cart-content bg-white pb-3">
      <div
        onClick={() => show(false)}
        style={{
          cursor: "pointer",
          width: "fit-content",
          marginLeft: 25,
          marginTop: 25,
          fontSize: "25px",
        }}
        className="ml-1  rounded-circle px-2 py-1 mt-2 text-white text-info  "
      >
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="pb-3 pt-2 cart-content">
        {carts &&
          Object.values(carts).map((cart, index) => (
            <Row className="py-2" key={index}>
              <Row className="pb-1">
                <Col md={4}>
                  <ImgStyle
                    src={cart?.product?.avatar}
                    alt="cartImage"
                    style={{ cursor: "pointer" }}
                  />
                </Col>
                <Col md={8} style={{ paddingLeft: "40px" }}>
                  <Row className="limit">{cart?.product?.name} </Row>
                  <Row style={{ color: "#7f868d" }} className="text-dark">
                    <span>
                      {Number.parseInt(
                        cart?.product?.price * cart?.quantity
                      ).toLocaleString() || 0}
                      đ{" "}
                    </span>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div
                        style={{ gap: "0 10px" }}
                        className="d-flex my-1 justify-content-between align-items-center "
                      >
                        <CartButton
                          onClick={() => handleCart(cart?.product?._id, -1)}
                        >
                          <ChevronLeftIcon />
                        </CartButton>
                        {cart?.quantity}
                        <CartButton
                          onClick={() => handleCart(cart?.product?._id, 1)}
                        >
                          <ChevronRightIcon />
                        </CartButton>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Divider variant="fullWidth" className="w-100" />
            </Row>
          ))}
      </div>
      <div
        style={{ width: "90%" }}
        className="d-flex text-primary justify-content-between mx-auto pt-2"
      >
        <span>Total</span>
        <span>{total} đ</span>
      </div>
      <Row style={{ width: "90%" }} className=" mx-auto pt-1">
        <BtnFooter
          style={{ width: "100%" }}
          className="mb-2"
          onClick={() => navigate("/viewcart")}
          variant="contained"
        >
          VIEW CARD
        </BtnFooter>
        <BtnFooter
          disabled={Object.values(carts)?.length === 0}
          style={{ width: "100%" }}
          variant="contained"
          onClick={() => navigate("/checkout")}
        >
          CHECKOUT
        </BtnFooter>
      </Row>
    </div>
  );
};

export default Cart;
