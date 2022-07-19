import React, { useContext, useEffect, useState } from "react";
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
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Box, Divider, LinearProgress, Modal, Typography } from "@mui/material";
import axiosClient from "../../app/AxiosClient";
import { apiURL } from "../../Context/constant";
import { CategoryContext } from "../../Context/CategoryContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const Order = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const { data: user, refetch, error } = useUserQuery();
  const ORDER = useSelector((state) => state.orders.orderDetail);
  const isLoading = useSelector((state) => state.orders.isLoading);
  const urlPayment = useSelector((state) => state.orders.urlPayment);
  const isPaymentLoading = useSelector(
    (state) => state.orders.isPaymentLoading
  );
  const { setShowToast } = useContext(CategoryContext);
  const [pd, setPd] = useState([]);
  const { data } = useUserQuery();
  const [urlStripe, setUrlStripe] = useState("");
  const [up, setUp] = useState([]);
  const dataMapping = useSelector((state) => state.orders?.mapping);
  // console.log(data);
  useEffect(() => {
    fetch();
  }, [data, id]);
  // useEffect(() => {
  //   if(!!ORDER){
  //     setUp(ORDER)
  //   }
  // }, [ORDER]);
  useEffect(() => {
    console.log(searchParams.get("success"));
    const isSuccess = searchParams.get("success");
    if (isSuccess === "true") {
      setOpen(true);
      // upp();
      setTimeout(() => {
        setOpen(false);
        fetch();
      }, 3000);
    } else if (isSuccess === "false") {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
    // setSearchParams("success");
  }, [searchParams]);
  // const upp = async () => {
  //   setTimeout(() => {
  //     upOrder();
  //   }, 3000);
  // };
  useEffect(() => {
    if (!!ORDER && searchParams.get("success") === "true") {
      upOrder();
    }
  }, [open]);
  const fetch = async () => {
    if (!data?._id) {
      return;
    }
    console.log("fetch", data?._id, id);
    const action = myOrder({
      userId: data?._id || "",
    });
    await dispatch(action);
    // const res = await unwrapResult(action);
    const action1 = await orderdetail(id);
    // console.log(id);
    dispatch(action1);
    const action2 = await mapping();
    dispatch(action2);
  };
  const handlePayment = async (id) => {
    console.log(id);
    if (!ORDER?.payment || ORDER?.payment === "momo") {
      const action = await dispatch(payment({ id: id }));
      const res = unwrapResult(action);
      console.log(res.payUrl);
      window.open(res.payUrl, "_blank")?.focus();
      setTimeout(() => {
        upOrder();
      }, 6000);
    } else if (ORDER?.payment === "paypal" || ORDER?.payment === "stripe") {
      console.log(dataMapping);
      stripeFetch();
    }
  };
  const stripeFetch = async () => {
    try {
      const params = {
        items: dataMapping.map((dt) => {
          return {
            name: dt?.product?.name,
            price: dt?.product?.price,
            quantity: dt?.quantity,
          };
        }),
        id: ORDER?._id,
      };
      const res = await axiosClient.post(
        `${apiURL}/create-checkout-session`,
        params
      );
      window.open(res?.url, "_blank")?.focus();
      // upOrder();
      setUrlStripe(res?.url);
    } catch (error) {
      setShowToast({
        show: true,
        color: "e",
        message: "Error !",
      });
    }
  };
  const upOrder = async () => {
    try {
      console.log("myid", ORDER?._id, id);
      let params = {};
      if (
        !!ORDER?.deliveryAddress &&
        ORDER?.deliveryAddress === ORDER?.currentAddress
      ) {
        params = {
          id: ORDER?._id,
          body: {
            isPaid: true,
            status: "done",
            paidTime: new Date().toISOString(),
          },
        };
      } else {
        params = {
          id: ORDER?._id,
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <AbsoluteHeader></AbsoluteHeader>
      <Breadcrumb breadcrumb={`/order/${id}`}></Breadcrumb>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className={`text-center ${
              searchParams.get("success") === "true"
                ? "text-success"
                : "text-danger"
            }`}
          >
            <CheckCircleOutlineIcon fontSize="ok2" />
          </div>
          <div
            className={`fs21 fw700 text-center modal-modal-description ${
              searchParams.get("success") === "true"
                ? "text-success"
                : "text-danger"
            }`}
            sx={{ mt: 2 }}
          >
            THANH TOÁN{" "}
            {searchParams.get("success") === "true" ? "THÀNH CÔNG" : "THẤT BẠI"}{" "}
            !
          </div>
          {searchParams.get("success") === "true" && (
            <>
              <div className="fs17 mt-3 mb-3 fw700 text-center">
                Đơn hàng : {ORDER?._id}
              </div>
              <Divider className="mb-2" />
              <div className="mb-2">Tổng hàng : {ORDER?.totalPrice} vnđ</div>
              <div>Bank : {ORDER?.payment}</div>
            </>
          )}
        </Box>
      </Modal>
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
                <p className="mb-3">Method: {ORDER?.payment || "momo"}</p>
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
                <Col className="text-right">0</Col>
              </Row>
              <Divider className="my-3"></Divider>
              <Row>
                <Col>Order Total</Col>
                <Col className="text-right">
                  {new Intl.NumberFormat().format(ORDER?.totalPrice)} đ
                </Col>
              </Row>
              {!ORDER?.isPaid && ORDER?.user?._id === user?._id && (
                <Button
                  className="mt-5 fw700 py-3 w-100"
                  onClick={() => handlePayment(ORDER?._id)}
                >
                  Pay {formatNumber(ORDER?.totalPrice)} vnđ
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
