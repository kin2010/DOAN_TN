import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "reactstrap";
import { Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useUserQuery } from "../../app/AuthApi";
import Breadcrumb from "../../components/BreadCrum";
import { formatDate, formatNumber, formatTime } from "../../Utils/func";
import { AbsoluteHeader } from "../SingleProduct";
import {
  mapping,
  myOrder,
  orderdetail,
  payment,
  updateOrder,
} from "../../Slice/OrderSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import "./index.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Divider, LinearProgress } from "@mui/material";
const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: user, refetch, error } = useUserQuery();
  const ORDER = useSelector((state) => state.orders.orderDetail);
  const isLoading = useSelector((state) => state.orders.isLoading);
  const urlPayment = useSelector((state) => state.orders.urlPayment);
  const isPaymentLoading = useSelector(
    (state) => state.orders.isPaymentLoading
  );
  const [pd, setPd] = useState([]);
  const { data } = useUserQuery();
  const dataMapping = useSelector((state) => state.orders?.mapping);
  // console.log(data);
  useEffect(() => {
    fetch();
  }, [data]);
  const fetch = async () => {
    if (!data?._id) {
      return;
    }
    const action = await dispatch(
      myOrder({
        userId: data?._id || "",
      })
    );
    // const res = await unwrapResult(action);
    const action1 = await orderdetail(id);
    console.log(id);
    dispatch(action1);
    const action2 = await mapping();
    dispatch(action2);
  };
  const handlePayment = async (id) => {
    console.log(id);
    const action = await dispatch(payment({ id: id }));
    const res = unwrapResult(action);
    console.log(res.payUrl);
    window.open(res.payUrl, "_blank")?.focus();
    setTimeout(() => {
      upOrder();
    }, 6000);
  };
  const upOrder = async () => {
    try {
      let params = {};
      if (ORDER?.deliveryAddress === ORDER?.currentAddress) {
        params = {
          id: ORDER._id,
          body: {
            isPaid: true,
            status: "done",
            paidTime: new Date().toISOString(),
          },
        };
      } else {
        params = {
          id: ORDER._id,
          body: {
            isPaid: true,
            status: "paid",
            paidTime: new Date().toISOString(),
          },
        };
      }
      const action2 = updateOrder(params);
      await dispatch(action2);
      await fetch();
    } catch (error) {
      console.log(error);
    }
  };
  const mapPaid = (order) => {
    if (order) {
      if (order?.isPaid) {
        return (
          <Alert variant="success">
            Paid at {formatTime(order?.paidTime) || ""}
          </Alert>
        );
      }
      if (!order?.isPaid) {
        return <Alert variant="danger">Not Paid</Alert>;
      }
    }
  };
  const mapDelivery = (order) => {
    if (order) {
      switch (order?.status) {
        case "done": {
          return (
            <Alert variant="success">
              Delivered at{" "}
              <strong className="fs20">{order?.deliveryAddress}</strong> on{" "}
              {formatTime(order?.deliveryTime)}
            </Alert>
          );
        }
        case "shipping": {
          return (
            <Alert variant="info">
              {order?.currentAddress &&
                `Shipping : Delivered at ${
                  order?.currentAddress
                } on ${formatTime(order?.deliveryTime)}`}
            </Alert>
          );
        }
        case "over": {
          return (
            <Alert variant="danger">
              Bill Canceled on {formatTime(order?.updatedAt)}
            </Alert>
          );
        }
        case "paid": {
          if (order?.currentAddress) {
            return (
              <Alert variant="info">
                {order?.currentAddress &&
                  `Shipping : Delivered at ${
                    order?.currentAddress
                  } on ${formatTime(order?.deliveryTime)}`}
              </Alert>
            );
          } else return <Alert variant="info">Shipping</Alert>;
        }
        default: {
          return (
            <Alert variant="warning">
              {order?.status?.toString().toUpperCase()}
            </Alert>
          );
        }
      }
    }
  };
  return (
    <>
      <AbsoluteHeader></AbsoluteHeader>
      <Breadcrumb breadcrumb={"order"}></Breadcrumb>
      {/* <div className="content">
        <Row className="px-5">
          <Col md={8} sm={6}>
            <Row className="flex-column mx-0">
              <div
                className="text-success mb-4"
                style={{ fontWeight: 800, marginTop: 30, fontSize: 30 }}
              >
                Shipping
              </div>
              <Row className=" flex-column mx-0 shadow  border-top p-5">
                <Row>
                  <div className="h5">Name : {user?.fullName}</div>
                </Row>
                <Row>
                  <div className="h5">Address : {ORDER?.deliveryAddress}</div>
                </Row>
               
                {ORDER?.status === "shipping" || ORDER?.status === "done" ? (
                  <Alert variant="success">
                    Delivered at {ORDER?.deliveryAddress} on{" "}
                    {formatDate(ORDER.updatedAt)}
                  </Alert>
                ) : (
                  <Alert variant="danger">Not Delivered</Alert>
                )}
              </Row>
            </Row>
            <Row className="flex-column mx-0">
              <Row
                className="text-success mb-4"
                style={{ fontWeight: 800, marginTop: 30, fontSize: 30 }}
              >
                Payment
              </Row>
              <Row className="flex-column mx-0 shadow  border-top p-5">
                <Row>
                  <div className="h5">Method : MoMo</div>
                </Row>

                {ORDER?.status === "paid" || ORDER?.status === "done" ? (
                  <Alert variant="success">
                   
                    Paid on {formatDate(ORDER.updatedAt)}
                  </Alert>
                ) : (
                  <Alert variant="danger">Not Paid</Alert>
                )}
              </Row>
            </Row>
            <Row className="flex-column mx-0">
              <Row
                className="text-success mb-4"
                style={{ fontWeight: 800, marginTop: 30, fontSize: 30 }}
              >
                Detail
              </Row>
              <Row className="flex-column mx-0 shadow  border-top p-5">
                <Row className="h4 text-success font-weight-bold mb-3">
                  Order Items
                </Row>
                {isLoading && (
                  <Spinner className="d-flex align-items-center justify-content-center" />
                )}
                {!isLoading &&
                  dataMapping?.length > 0 &&
                  dataMapping?.map((a, index) => (
                    <>
                      <Row
                        className="text-center mb-3"
                        key={`index-${a.product._id}`}
                      >
                        <Col>
                          <img
                            src={a?.product?.avatar}
                            alt=""
                            className="img-order"
                          />
                        </Col>
                        <Col className="d-flex align-items-center justify-content-center">
                          <div
                            className=" h6 text-primary"
                            to={`/shop-single/${a?.product?._id}`}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate.push(`/shop-single/${a?.product?._id}`)
                            }
                          >
                            {a?.product?.name.toString().slice(0, 25)}
                          </div>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-center">
                          {a.product.price}Đ x {a.quantity} ={" "}
                          {new Intl.NumberFormat().format(
                            a.product.price * a.quantity
                          )}
                          Đ
                        </Col>
                      </Row>
                      <hr />
                    </>
                  ))}
              </Row>
            </Row>
          </Col>
          <Col md={4}>
            <div
              className="text-success mb-4"
              style={{ fontWeight: 800, marginTop: 30, fontSize: 30 }}
            >
              ORDER SUMMARY
            </div>
            <Row className="shadow  border-top p-5">
              <Row className="w-100">
                <Col>
                  <div className="h5">Items :</div>
                </Col>
                <Col>{new Intl.NumberFormat().format(ORDER?.totalPrice)}Đ</Col>
              </Row>
              <hr />
              <Row className="w-100">
                <Col>
                  <div className="h5">Shipping :</div>
                </Col>
                <Col>Free Shipping</Col>
              </Row>
              <hr />
              <Row className="w-100">
                <Col>
                  <div className="h5">Order Total :</div>
                </Col>
                <Col>
                  <div className="h3 text-primary">
                    {new Intl.NumberFormat().format(ORDER?.totalPrice)}Đ
                  </div>
                </Col>
              </Row>

              {ORDER?.status !== "paid" &&
                ORDER?.status !== "over" &&
                ORDER?.status !== "done" && (
                  <Row className="mt-5 d-flex justify-content-center w-100  ">
                    <Button
                      variant="primary w-100"
                        onClick={() => PayMent(ORDER?._id)}
                    >
                      Pay
                    </Button>
                    {true && <Spinner className=" mt-3 text-primary" />}
                    {isLoadingPayment && (
                      <Spinner className=" mt-3 text-primary" />
                    )}
                  </Row>
                )}
              {ORDER?.status === "paid" &&
                ORDER?.status === "over" &&
                ORDER?.status === "done" && (
                  <Alert variant="success">
                    {ORDER?.status?.toUpperCase()}
                  </Alert>
                )}
            </Row>
          </Col>
        </Row>
      </div> */}
      <div class="fm d-flex px-5">
        <Col md={7} sm={6} className="mr-1">
          <div className="mb-2 mt-5 ">
            <h2 className="pl-5 mb-5">Shipping</h2>
            {!isLoading ? (
              <div className="py-3 px-5 shadow ">
                <p>Name: {user?.fullName}</p>
                <p className="mb-3">Address: {ORDER?.deliveryAddress}</p>
                {mapDelivery(ORDER)}
              </div>
            ) : (
              <LinearProgress color="success" />
            )}
          </div>
          <Divider className="py-5"></Divider>
          <div className="mb-2 mt-5 ">
            <h2 className="pl-5 mb-5">Payment</h2>
            {!isLoading ? (
              <div className="py-3 px-5 shadow ">
                <p className="mb-3">Method: Momo</p>
                {mapPaid(ORDER)}{" "}
              </div>
            ) : (
              <LinearProgress color="success" />
            )}
          </div>
          <Divider className="py-5"></Divider>
          <div className="mb-2 mt-5 ">
            <h2 className="pl-5 mb-5">Detail</h2>
            <div className="py-3 px-5 shadow ">
              {dataMapping?.length > 0 &&
                dataMapping.map((map, index) => (
                  <div key={index}>
                    <div className="item d-flex align-items-center justify-center">
                      <Col md={4}>
                        <img
                          className="img"
                          src={map?.product?.avatar || " ../images/img1.png"}
                          alt="item"
                        />
                      </Col>
                      <Col md={4}>
                        <p
                          onClick={() =>
                            navigate(`/product/${map?.product?._id}`)
                          }
                          // href={`/product/${map?.product?._id}`}
                          className="link"
                        >
                          {map?.product?.name}
                        </p>
                      </Col>
                      <Col md={4}>
                        <p style={{ fontSize: "19px" }}>
                          {map?.product?.price} x {map?.quantity}={" "}
                          {formatNumber(
                            map?.product?.price * map?.quantity || 0
                          )}
                        </p>
                      </Col>
                    </div>
                    <Divider className="py-3"></Divider>
                  </div>
                ))}
              {isLoading && <LinearProgress color="success" />}
            </div>
          </div>
        </Col>
        <Col md={5} sm={6}>
          <div className="mb-2 mt-5 ">
            <h2 className=" mb-5" style={{ paddingLeft: "70px" }}>
              Payment
            </h2>
            <div className="py-3 pb-4  shadow " style={{ padding: "0px 70px" }}>
              <Row>
                <Col>Item</Col>
                <Col className="text-right">
                  {new Intl.NumberFormat().format(ORDER?.totalPrice)} đ
                </Col>
              </Row>
              <Divider className="my-3"></Divider>
              <Row>
                <Col>Shipping</Col>
                <Col className="text-right">10000</Col>
              </Row>
              <Divider className="my-3"></Divider>
              <Row>
                <Col>Order Total</Col>
                <Col className="text-right">10000</Col>
              </Row>
              {!ORDER?.isPaid && ORDER?.user?._id === user?._id && (
                <Button
                  className="mt-5 py-3 w-100"
                  onClick={() => handlePayment(ORDER?._id)}
                >
                  Pay
                </Button>
              )}

              {isPaymentLoading && (
                <LinearProgress className="my-5" color="primary" />
              )}
            </div>
          </div>
        </Col>
      </div>
    </>
  );
};

export default Order;
