import React, { useContext, useEffect } from "react";
import Header from "../Header";
import { Container, Row, Col, Form } from "react-bootstrap";
import Product from "../Product";
import { useDispatch, useSelector } from "react-redux";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ShopDrop from "./ShopDrop";
import Empty from "../Empty.js";
import "./index.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Breadcrumb from "../BreadCrum";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { Pagination } from "@mui/material";
import Footer from "../Footer";
import Notification from "../../Admin/components/Notifacation/Notification";
const Shop = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const subs = useSelector((state) => state.category.subCategories);
  const products = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);
  const { conditionProduct, setCondition } = useContext(ShopContext);
  const { setPage } = useContext(ShopContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (location?.pathname.includes("subcategory")) {
      setCondition({
        subCategory: params?.id,
      });
    }
    if (
      location?.pathname.includes("category") &&
      !location?.pathname.includes("subcategory")
    ) {
      setCondition({
        category: params?.id,
      });
    }
  }, [location, params]);
  let listCategories = "";
  listCategories = (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
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
  const handlePageChange = (e, page) => {
    console.log(page);
    setPage(page);
  };
  const handeAll = () => {
    setCondition({});
    navigate("/shop");
  };
  return (
    <>
      <Header></Header>
      <Breadcrumb breadcrumb="Shop"></Breadcrumb>
      <Notification />
      <div style={{ backgroundColor: "#f9f9f9" }}>
        <Container>
          <Row style={{ backgroundColor: "#f9f9f9", paddingTop: "30px" }}>
            <Row style={{ width: "100%", marginBottom: "20px" }}>
              <Col md={3}></Col>
              <Col md={9} className="text-center">
                <img
                  style={{ width: "inherit" }}
                  src="../images/shop1.png"
                  alt="nofile"
                />
              </Col>
            </Row>{" "}
            <Row style={{ width: "100%" }}>
              <Col md={3}>{listCategories}</Col>
              <Col md={9}>
                <div className="mb-4 d-flex align-items-center justify-content-between">
                  <p
                    style={{ paddingLeft: "21px", cursor: "pointer" }}
                    className="my-2 pl-3"
                    onClick={handeAll}
                  >
                    All
                  </p>
                  <Form.Select
                    style={{
                      width: "200px",
                      borderTop: "0px",
                      borderRight: "0px",
                      borderLeft: "0px",
                    }}
                    aria-label="Sort"
                  >
                    <option>Select ... </option>
                    <option value="1">default</option>
                    <option value="1">price</option>
                    <option value="2">rating</option>
                    <option value="3">hot</option>
                  </Form.Select>
                </div>
                {isLoading === true && (
                  <Row className="shop-content">
                    <CircularProgress
                      style={{ margin: "40px auto 0 auto" }}
                    ></CircularProgress>
                  </Row>
                )}
                <Row className="shop-content">
                  {products.length > 0 ? (
                    products?.map((product, index) => (
                      // <Col md={4} key={index}>
                      <Product
                        className="ppd"
                        chip="sale"
                        product={product}
                        key={index}
                      ></Product>
                      // </Col>
                    ))
                  ) : (
                    <Empty />
                  )}
                </Row>{" "}
                <div className="mt-5 pb-3 d-flex align-items-center justify-content-between">
                  <Pagination
                    onChange={(e, page) => handlePageChange(e, page)}
                    count={10}
                    color="secondary"
                  />
                  <p className="m0">Showing {products?.length} entries</p>
                </div>
              </Col>
            </Row>
          </Row>
        </Container>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Shop;
