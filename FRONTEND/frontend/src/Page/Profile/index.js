import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "../../components/BreadCrum";
import Footer from "../../components/Footer";
import { AbsoluteHeader } from "../SingleProduct";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "./index.scss";
import { myOrder } from "../../Slice/OrderSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUserQuery } from "../../app/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import { formatNumber } from "../../Utils/func";
import { MAP_STATUS } from "../../constant";
import PersonIcon from "@mui/icons-material/Person";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { CAvatar } from "@coreui/react";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QrCode2Icon from "@mui/icons-material/QrCode2";
const Profile = () => {
  const { data: user } = useUserQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bills = useSelector((state) => state.orders.bill);
  const isLoading = useSelector((state) => state.orders.isLoading);
  // if (!user) {
  //   navigate("/login");
  // }
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const action = myOrder({
        userId: user?._id,
      });
      await dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AbsoluteHeader></AbsoluteHeader>
      <Breadcrumb breadcrumb={"Order History"}></Breadcrumb>
      <div className="bg-light pb-5">
        <Container>
          {/* <Row>
            <Col md={7} sm={12}>
              <h2 className="page-title">Order History</h2>
              {isLoading && <LinearProgress />}
              <div className="">
                {bills.length > 0 &&
                  Object.values(bills).map((bill) => (
                    <div
                      key={bill?._id}
                      className="bill mb-5 shadow2 bg-white fm2"
                      style={{ maxWidth: "900px", padding: "30px 40px" }}
                    >
                      <div className="d-flex mb-4 align-items-center justify-content-between">
                        <Link
                          to={`/order/${bill?._id}`}
                          className="bill-id h4 "
                        >
                          {bill?._id}
                        </Link>
                        <div
                          onClick={() => navigate(`/order/${bill?._id}`)}
                          style={{ paddingRight: "100px", cursor: "pointer" }}
                          className="d-flex text-danger align-items-center justify-content-center"
                        >
                          <RemoveRedEyeIcon
                            style={{ marginRight: "5px" }}
                          ></RemoveRedEyeIcon>
                          <div className="fw700 ml-5 text-danger">DETAIL</div>
                        </div>
                      </div>
                      <p className="h5 fw300">
                        Bill Total :
                        <span className="h5 fw700">
                          {formatNumber(bill?.totalPrice)} Đ
                        </span>
                      </p>
                      <p className="h5 fw300">
                        Address delivery :
                        <span className="h5 fw700">hoa giang adadadadadad</span>
                      </p>
                      <p className="h5 fw300">
                        Status :
                        <span
                          className="h5 fw700"
                          style={{ color: MAP_STATUS[bill?.status] }}
                        >
                          {bill?.status}
                        </span>
                      </p>
                    </div>
                  ))}
              </div>
            </Col>
            <Col md={1} sm={12}>
            <h2 className="page-title">Order History</h2>
            </Col>
            <Col md={4} sm={12}></Col>
          </Row> */}
          <Row className="pt-5">
            <Col md={3}>
              <div className="d-flex align-items-center ">
                <CAvatar
                  style={{ width: "25%" }}
                  className="me-3 "
                  src={user?.avatar}
                ></CAvatar>
                <div className="d-flex flex-column ">
                  <div className="fw700">{user?.fullName}</div>
                  <div className="fw300">
                    <EditIcon />
                    Edit Profile
                  </div>
                </div>
              </div>
              <ul className="" style={{ marginTop: "50px" }}>
                <li
                  className="mb-3"
                  onClick={() => navigate("/profile/change-profile")}
                >
                  <div
                    style={{ gap: "0 33px" }}
                    className="d-flex align-items-center"
                  >
                    <PersonIcon className="text-primary" />
                    <div className="fw500">My Profile</div>
                  </div>
                </li>

                <li
                  className="mb-3"
                  onClick={() => navigate("/profile/myorder")}
                >
                  <div
                    style={{ gap: "0 33px" }}
                    className="d-flex align-items-center"
                  >
                    <LocalMallIcon className="text-success" />
                    <div className="fw500">Your Order</div>
                  </div>
                </li>

                {/* <li className="mb-3">
                  <div
                    style={{ gap: "0 33px" }}
                    className="d-flex align-items-center"
                  >
                    <FavoriteIcon className="text-danger" />
                    <div className="fw500">Favorite</div>
                  </div>
                </li> */}

                <li className="mb-3">
                  <div
                    style={{ gap: "0 33px" }}
                    className="d-flex align-items-center"
                  >
                    <QrCode2Icon />
                    <div className="fw500">More ...</div>
                  </div>
                </li>
              </ul>
            </Col>

            <Col md={9}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Profile;
