import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Product from "../Product";
import Header from "../Header";
import { useUserQuery } from "../../app/AuthApi";
import Slider from "../Carousel";
import { AbsoluteHeader } from "../../Page/SingleProduct";
import TopPage from "../../Page/TopPage";
import HotPage from "../../Page/HotPage";
import ReviewPage from "../../Page/ReviewPage";
import { Divider } from "@mui/material";
import Footer from "../Footer";

const Home = () => {
  const { data: user, isLoading, error } = useUserQuery();
  return (
    <>
      <AbsoluteHeader></AbsoluteHeader>
      {/* {user && JSON.stringify(user)} */}
      <Slider></Slider>
      <TopPage></TopPage>
      <HotPage></HotPage>
      <ReviewPage></ReviewPage>
      <hr></hr>
      <Footer></Footer>
    </>
  );
};

export default Home;
