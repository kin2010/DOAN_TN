import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Rating from '../Rating';
import './index.scss';
const formatDate = (day) => {
  return ''.concat(day.substring(0, 10), ' ', day.substring(11, 19));
};
const Comment = () => {
  const comments = [];
  const [formValue, setFormvalue] = useState({
    comment: '',
    rating: 0,
  });
  const onChangeForm = (e) => {
    setFormvalue({ ...formValue, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formValue);
  };
  return (
    <Row
      id="tab3"
      className="pt-5 p-3 pb-5 cmt mt-5"
      style={{ backgroundColor: '#e9eef5', borderRadius: '25px' }}
    >
      <hr />
      <Col>
        <Row>
          {' '}
          <div className="h2 mb-5 text-success">Reviews</div>{' '}
        </Row>

        <Row className="p-3">
          <Row
            className="p-3"
            style={{
              backgroundColor: '#fff',
              borderRadius: '25px',
              marginRight: '30px',
            }}
          >
            <Row className="w-100 mb-3">
              <Col md={4} className="d-flex align-items-center ">
                <Avatar alt="Remy Sharp" src={'../images/user.png'} />
                <span className="ml-3">Kin lee</span>
              </Col>
              <Col md={8} style={{ paddingTop: '5px' }}>
                29-05-2022
              </Col>
            </Row>

            <Row className="w-100 pl-3 mb-3">
              <Rating rating={2.4}></Rating>
            </Row>
            <Row className="w-100 pl-3">
              <p>Tui rat thich san pham nay, nhu cc luon</p>
            </Row>
            {comments && comments?.length > 0 ? (
              Object.values(comments).map((cmt) => {
                return (
                  <>
                    <Row className="mb-5" key={cmt._id}>
                      <Row>
                        <Col md={4}>
                          {' '}
                          <div className="h3">{cmt?.name}</div>
                        </Col>

                        <Col md={8}>
                          {cmt.createdAt && formatDate(cmt?.createdAt)}
                        </Col>
                      </Row>

                      <Row>
                        <Rating
                          rating={cmt.rating && cmt.rating.toFixed(2)}
                        ></Rating>
                      </Row>
                      <Row>
                        <div className="text-primary h5">{cmt?.comment}</div>
                      </Row>
                    </Row>
                  </>
                );
              })
            ) : (
              <div></div>
            )}
          </Row>
        </Row>
      </Col>

      <Col className="">
        <Row>
          {' '}
          <div className="h2 mb-5 text-success">
            Write a customer review
          </div>{' '}
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
