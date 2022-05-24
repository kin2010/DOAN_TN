import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Login, { AlertStyled } from './Login.js';
import Register from './Register.js';
import Header from '../Header';
import Breadcrumb from '../BreadCrum/index.js';
import { useLoginMutation } from '../../app/AuthApi.js';
const Auth = ({ auth }) => {
  const [{ error }] = useLoginMutation();
  let body;
  let label;
  const navigate = useNavigate();
  // if (isAuthenticated) {
  //   if (getRoleID() === 'Admin') {
  //     return <Redirect to="/admin/overview" />;
  //   } else return <Redirect to="/shop" />;
  // }
  label = (
    <>
      {auth === 'login' && (
        <>
          {' '}
          <span
            onClick={() => {
              navigate('/login');
            }}
            style={{ color: '#ff536f', fontWeight: 900 }}
          >
            Login
          </span>{' '}
          <span>| </span>
          <span
            onClick={() => {
              navigate('/register');
            }}
            style={{ fontWeight: 900 }}
          >
            {' '}
            Register
          </span>
        </>
      )}
      {auth === 'register' && (
        <>
          {' '}
          <span
            onClick={() => {
              navigate('/login');
            }}
            style={{ fontWeight: 900 }}
          >
            Login
          </span>
          <span>| </span>
          <span
            onClick={() => {
              navigate('/register');
            }}
            style={{ color: '#ff536f', fontWeight: 900 }}
          >
            Register
          </span>
        </>
      )}
    </>
  );
  body = (
    <>
      {auth === 'login' && <Login></Login>}
      {auth === 'register' && <Register></Register>}
    </>
  );
  return (
    <>
      <Header></Header>
      <Breadcrumb breadcrumb="Login"></Breadcrumb>
      {error && error?.data?.message}
      {error && (
        <AlertStyled variant="filled" color="info" severity="error">
          {error?.data?.message}
        </AlertStyled>
      )}
      <Container fuild="true" style={{ position: 'relative' }}>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <div
              style={{
                textAlign: 'center',
                fontSize: 30,
                cursor: 'pointer',
                fontFamily: 'Poppins,sans-serif',
              }}
              className="mb-4"
            >
              {label}
            </div>
            {body}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
