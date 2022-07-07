import { Avatar, Divider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useUserQuery } from "../../app/AuthApi";
import axiosClient from "../../app/AxiosClient";
import { CategoryContext } from "../../Context/CategoryContext";
import { apiURL } from "../../Context/constant";
import { getOne, updateProduct } from "../../Slice/ShopSlice";
import Rating from "../Rating";
import "./index.scss";
const formatDate = (day) => {
  return "".concat(day.substring(0, 10), " ", day.substring(11, 16));
};
const Comment = () => {
  const dispatch = useDispatch();
  const { setShowToast, closeToast } = useContext(CategoryContext);

  const pd = useSelector((state) => state.products.pdUpdate);
  const { data: user, isLoading, error } = useUserQuery();
  const [comments, setCMT] = useState([]);
  const [formValue, setFormvalue] = useState({
    comment: "",
    rating: 0,
  });
  const onChangeForm = (e) => {
    setFormvalue({ ...formValue, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (pd) {
      setCMT(pd.comments);
    }
  }, [pd]);
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const params = {
        name: user?.fullName,
        rating: formValue.rating,
        comment: formValue.comment,
        avatar: user?.avatar,
      };
      console.log(params);
      const res = await axiosClient.post(`${apiURL}/comment`, params);
      if (res) {
        const params1 = {
          _id: pd?._id,
          comments: [res._id, ...Object.values(pd.comments)],
        };

        const action = updateProduct(params1);
        const res1 = await dispatch(action);
        if (res1) {
          setShowToast({
            show: true,
            message: "Thanks for the review.",
            color: "s",
          });
          closeToast();
          fetchProduct();
        }
      }
    } catch (error) {
      console.log(error);
      setShowToast({
        show: true,
        message: "Error!",
        color: "e",
      });
      closeToast();
    }
  };
  const fetchProduct = async () => {
    try {
      const par = {
        id: pd?._id,
      };
      const action = getOne(par);
      await dispatch(action);
    } catch (error) {
      // setShowToast({
      //   show: true,
      //   message: "Error !",
      //   color: "e",
      // });
    }
  };
  console.log(comments);
  return (
    <Row
      id="tab3"
      className="pt-5 p-3 pb-5 cmt mt-5"
      style={{ backgroundColor: "#e9eef5", borderRadius: "25px" }}
    >
      <hr />
      <Col>
        <Row>
          {" "}
          <div className="h2 mb-5 text-success">Reviews</div>{" "}
        </Row>

        <Row className="p-3">
          {!!comments && comments?.length > 0 ? (
            Object.values(comments).map((cmt) => (
              <Row
                key={cmt?._id}
                className="p-3 mb-3"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "25px",
                  marginRight: "30px",
                }}
              >
                <Row className="w-100 mb-3">
                  <Col
                    md={6}
                    className="d-flex align-items-center "
                    style={{ gap: "0 15px" }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={cmt?.avatar || "../images/user.png"}
                    />
                    <span className="ml-3">{cmt?.name}</span>
                  </Col>
                  {cmt?.createdAt && (
                    <Col md={6} style={{ paddingTop: "5px" }}>
                      {formatDate(cmt?.createdAt)}
                    </Col>
                  )}
                </Row>

                <Row className="w-100 pl-3 mb-3">
                  <Rating rating={cmt?.rating}></Rating>
                </Row>
                <Row className="w-100 pl-3">
                  <p style={{ whiteSpace: "pre-wrap" }}>{cmt?.comment}</p>
                </Row>
              </Row>
            ))
          ) : (
            <div></div>
          )}
        </Row>
      </Col>

      <Col className="">
        <Row>
          {" "}
          <div className="h2 mb-5 text-success">
            Write a customer review
          </div>{" "}
        </Row>
        <Row>
          <Form onSubmit={submitHandler} className="w-100">
            <Form.Group className="mb-3" controlId="custom4">
              <Form.Label className="text-success h5">Rating</Form.Label>
              <Form.Control
                onChange={onChangeForm}
                name="rating"
                form="add"
                as="select"
                placeholder="Rating"
                value={formValue.rating}
                className="w-100"
                required
              >
                <option value="">Select...</option>
                <option value="1">1- Poor</option>
                <option value="2">2- Fair</option>
                <option value="3">3- Good</option>
                <option value="4">4- Very good</option>
                <option value="5">5- Excelent</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="custom5">
              <Form.Label className="text-success h5">Comment</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                name="comment"
                value={formValue.comment}
                onChange={onChangeForm}
                placeholder="Nhap Comment"
              />
            </Form.Group>

            <Button className="w-100" variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};

export default Comment;
