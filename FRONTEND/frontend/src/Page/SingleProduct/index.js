import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./index.scss";
import Breadcrumb from "../../components/BreadCrum";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Rating from "../../components/Rating";
import { styled } from "@mui/material/styles";
import { Button, CircularProgress, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Comment from "../../components/Comment";
import { useGetoneQuery } from "../../app/ProductQuery";
import { default as emotion } from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { addMutiCart } from "../../Slice/CartSlice";
import { getOne } from "../../Slice/ShopSlice";
import { CategoryContext } from "../../Context/CategoryContext";
import Notification from "../../Admin/components/Notifacation/Notification";
export const AbsoluteHeader = emotion(Header)((props) => ({
  ">nav": {
    position: "static!important",
    display: "block",
  },
}));
export const PdButton = styled(Button)((props) => ({
  // backgroundColor: `${props.theme.colors.main}`,
  fontSize: "30px",
  padding: 0,
  minWidth: 0,
  width: "60px",
  height: "40px",
  ":hover": {
    border: `1px solid ${props.theme.colors.success}`,
    backgroundColor: "#fff",
    color: "#28a745",
  },
}));
export const ButtonPrimaryOutline = styled(Button)((props) => ({
  border: `1px solid ${props.theme.colors.main}`,
  color: `${props.theme.colors.main}`,
  fontWeight: 600,
  background: "#fff",
  ":hover": {
    backgroundColor: `${props.theme.colors.main}`,
    color: "#fff",
  },
}));
export const ButtonPrimaryContained = styled(Button)((props) => ({
  backgroundColor: `${props.theme.colors.main}`,
  fontWeight: 600,
  color: "#fff",
  ":hover": {
    border: `1px solid ${props.theme.colors.main}`,
    color: `${props.theme.colors.main}`,
    background: "#fff",
  },
}));
export const MapRating = (cmt) => {
  // console.log(typeof cmt);
  if (cmt.length > 0) {
    const vl = Object.values(cmt).reduce((pre, vl) => pre + vl?.rating, 0);
    // console.log(vl, cmt);
    return vl / Object.values(cmt).length;
  }
  return 0;
};
const SingleProduct = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  // const { data, isLoading, error } = useGetoneQuery({ _id: params.id });
  const data = useSelector((state) => state.products.pdUpdate);
  const { isLoadingAdmin: isLoading } = useSelector(
    (state) => state.products.isLoadingAdmin
  );
  const [value, setValue] = React.useState("1");
  const [slides, setSlides] = useState([]);
  const { setShowToast } = useContext(CategoryContext);
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    try {
      const par = {
        id: params.id,
      };
      const action = getOne(par);
      await dispatch(action);
    } catch (error) {
      setShowToast({
        show: true,
        message: "Error !",
        color: "e",
      });
    }
  };
  useEffect(() => {
    if (!!data) {
      console.log(data?.avatar);
      let arr = [data?.avatar];
      arr.unshift(...data?.detailImage);
      setSlides(arr);
      // if (!!data?.detailImage) {
      //   setSlides(Object.values(data?.detailImage).unshift(data?.avatar));
      // } else {
      //   setSlides([data?.avatar]);
      // }
    }
  }, [data]);
  const handleQuantity = (value) => {
    if (quantity === 1 && value === -1) {
      return;
    }
    setQuantity(quantity + value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const addtoCart = () => {
    const payload = {
      product: data,
      quantity: quantity,
    };

    dispatch(addMutiCart(payload));
  };

  return (
    <>
      <Notification />
      <AbsoluteHeader></AbsoluteHeader>
      <Breadcrumb breadcrumb={`product / ${params.id.slice(-5)}`}></Breadcrumb>
      <Container>
        {isLoading === true && (
          <Col md={12}>
            <Row className="shop-content">
              <CircularProgress
                style={{ margin: "40px auto 0 auto" }}
              ></CircularProgress>
            </Row>
          </Col>
        )}
        {data && (
          <>
            <Row className="pt-5">
              <Col md={4}>
                <Carousel
                  className="border"
                  ariaLabel="Carosel"
                  autoPlay={true}
                  interval={6000}
                  infiniteLoop
                  transitionTime={1000}
                >
                  {!!slides &&
                    Object.values(slides).map((slide, index) => (
                      <div key={index}>
                        <img alt="nofile" src={slide} />
                        {/* <p className="legend">Legend 1</p> */}
                      </div>
                    ))}

                  {/* <div>
                    <img alt="nofile" src="../images/img1.png" />
                    <p className="legend">Legend 2</p>
                  </div>
                  <div>
                    <img alt="nofile" src="../images/img3.png" />
                    <p className="legend">Legend 3</p>
                  </div> */}
                </Carousel>
              </Col>
              <Col md={1}></Col>
              <Col md={7} className="pd pt-3">
                <h2 className="pd-name pb-1">{data?.name}</h2>
                <p className="pd-trademark text-dark mb-3">
                  Brand {data?.trademark?.name}
                </p>
                <Row className="mb-3" style={{ marginLeft: 0 }}>
                  <Rating rating={MapRating(data?.comments)}></Rating>{" "}
                  <span className="ml-3">{data?.comments?.length} reviews</span>
                </Row>
                <h4 className="pd-price text-success mb-3">
                  {Number.parseInt(data?.price).toLocaleString()} đ
                </h4>
                <h4 className="pd-desc mb-3">{data?.description}</h4>
                <div className="d-flex align-items-center mb-5">
                  <h4 className="pd-quantity mr-3">Quantity :</h4>
                  <PdButton
                    className=" mr-3"
                    color="success"
                    variant="contained"
                    onClick={() => handleQuantity(-1)}
                  >
                    -
                  </PdButton>
                  {quantity}
                  <PdButton
                    className=" ml-3"
                    color="success"
                    variant="contained"
                    onClick={() => handleQuantity(1)}
                  >
                    +
                  </PdButton>
                </div>
                <div className="d-flex justify-content-between">
                  <Button
                    style={{ width: "46%", fontWeight: 600 }}
                    variant="outlined"
                    color="success"
                    className="py-2"
                    onClick={() => addtoCart()}
                  >
                    ADD TO CART
                  </Button>
                  <Button
                    style={{ width: "46%", fontWeight: 600 }}
                    variant="contained"
                    color="success"
                    className="py-2"
                    onClick={() => navigate("/checkout")}
                  >
                    CHECKOUT
                  </Button>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: "100px" }}>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Description" value="1" as="a" href="#tab1" />
                      <Tab label="Instructions" as="a" href="#tab2" value="2" />
                      <Tab label="Reviews" as="a" href="#tab3" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <h2 id="tab1" className="pd-title">
                      Description :
                    </h2>
                    <p className="pd-description">{data?.description}</p>
                    <Divider variant="middle" />
                    <h2 className="pd-title" id="tab2">
                      Instructions :
                    </h2>
                    <p className="pd-description">{data?.instruction}</p>
                    <Divider variant="middle" />
                    <Comment id="tab3" />
                  </TabPanel>
                  <TabPanel value="2">
                    <h2 id="tab1" className="pd-title">
                      Description :
                    </h2>
                    <p className="pd-description">{data?.description}</p>
                    <Divider variant="middle" />
                    <h2 className="pd-title" id="tab2">
                      Instructions :
                    </h2>
                    <p className="pd-description">{data?.instruction}</p>
                    <Divider variant="middle" />
                    <Comment id="tab3" />
                  </TabPanel>
                  <TabPanel value="3">
                    <h2 id="tab1" className="pd-title">
                      Description :
                    </h2>
                    <p className="pd-description">{data?.description}</p>
                    <Divider variant="middle" />
                    <h2 className="pd-title" id="tab2">
                      Instructions :
                    </h2>
                    <p className="pd-description">{data?.instruction}</p>
                    <Divider variant="middle" />
                    <Comment cmt={data?.comments} />
                  </TabPanel>
                </TabContext>
              </Box>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default SingleProduct;
