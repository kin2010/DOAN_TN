import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserQuery } from "../../app/AuthApi";
import { fitterStatus, myOrder } from "../../Slice/OrderSlice";
import { Button, Col } from "react-bootstrap";
import { MAP_STATUS } from "../../constant";
import { Box, Divider, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../Utils/func";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
export const mapProduct = (product) => {
  if (product && product.length > 0) {
    const arr = product;
    const rs = [];

    for (let i = 0; i < arr.length; i++) {
      const id = arr[i]._id;
      const isId = rs.findIndex((value) => value?._id === id);

      if (isId === -1) {
        rs.push({ ...arr[i], quantity: 1 });
      } else {
        rs[isId] = { ...rs[isId], quantity: rs[isId]?.quantity + 1 };
      }
    }
    // console.log(rs);
    return rs || [];
  }
};
const MyOrder = () => {
  const { data: user } = useUserQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    let params = "";
    switch (newValue) {
      case "1": {
        params = "all";
        break;
      }
      case "2": {
        params = "pending";
        break;
      }
      case "3": {
        params = "shipping";
        break;
      }
      case "4": {
        params = "not_paid";
        break;
      }
      case "5": {
        params = "done";
        break;
      }
      case "6": {
        params = "paid";
        break;
      }
      default:
        params = "all";
    }
    const action = fitterStatus(params);
    dispatch(action);
    setValue(newValue);
  };

  useEffect(() => {
    if (user && user?._id) {
      fetchBill();
    }
  }, [user]);
  const fetchBill = async () => {
    try {
      const action = myOrder({
        userId: user?._id,
      });
      await dispatch(action);
    } catch (error) {}
  };
  const bill = useSelector((state) => state.orders.billCopy);
  // mapProduct(Object.values(bill)[3]?.product);
  return (
    <div>
      <TabContext value={value} className="mb-5">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Tất cả" value="1" />
            <Tab label="Chờ xác nhận" value="2" />
            <Tab label="Đã thanh toán" value="6" />
            <Tab label="Đang giao" value="3" />
            <Tab label="Đã giao" value="4" />
            <Tab label="Hoàn thành" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1"></TabPanel>
        <TabPanel value="2"></TabPanel>
        <TabPanel value="3"></TabPanel>
        <TabPanel value="4"></TabPanel>
        <TabPanel value="5"></TabPanel>
      </TabContext>
      <div>
        {bill &&
          Object.values(bill).map((bi) => (
            <div
              key={bi._id}
              className="shadow2 py-2 mb-5 pb-3"
              style={{ padding: "10px 30px", border: "1px solid gray" }}
            >
              <div
                className="d-flex justify-content-between mb-1 pe-2 fs14"
                style={{ color: MAP_STATUS[bi?.status] }}
              >
                <div>{formatTime(bi?.createdAt)}</div>
                {bi?.status.toString().toUpperCase()}
              </div>
              <Divider className="py-3" />
              <div
                className="w-100"
                style={{
                  height: "150px",
                  overflowY: "scroll",
                }}
              >
                <div
                  className=" ps-2 "
                  style={{
                    // borderTop: "1px solid gray",
                    borderBottom: "1px solid gray",
                    backgroundColor: "#fff",
                  }}
                >
                  {bi &&
                    bi?.product?.length > 0 &&
                    mapProduct(bi?.product).map((pd) => (
                      <div key={pd._id} className="py-1 ">
                        <div className=" d-flex align-items-center mb-2 ">
                          <Col md={3}>
                            <div className="img-div">
                              {" "}
                              <img
                                alt="no"
                                src={
                                  pd?.avatar ||
                                  "https://res.cloudinary.com/drvb2kjug/image/upload/v1657722820/doantotnghiep/empty_iasoc5.jpg"
                                }
                              />
                            </div>
                          </Col>
                          <Col md={9}>
                            <div className="ps-3">
                              <div className="fs16 fw700">
                                {pd?.name}
                                <span>{"\t\t"}</span> {"          "} x{" "}
                                <strong>{pd?.quantity}</strong>
                              </div>
                            </div>
                          </Col>
                        </div>
                        <Divider className="py-1" />
                      </div>
                    ))}
                </div>
              </div>
              <Divider className="py-3" />
              <div
                className="text-end mb-1 pe-2 fw700 fs20"
                // style={{ color: MAP_STATUS[bi?.status] }}
              >
                Total : {bi?.totalPrice}
              </div>
              <div className="d-flex w-100 mt-2">
                <Button
                  className="px-4 me-4"
                  onClick={() => navigate(`/order/${bi?._id}`)}
                >
                  Detail
                </Button>
                <Button className="px-4" onClick={() => navigate("/shop")}>
                  Shop
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyOrder;
