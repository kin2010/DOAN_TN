import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { Alert, Button } from "@mui/material";
import "./Login.css";
import Breadcrumb from "../BreadCrum";
import { useLoginMutation, useUserQuery } from "../../app/AuthApi";
import CircularProgress from "@mui/material/CircularProgress";
import { setRoleId, setToken } from "../../Utils/Common";
import { useNavigate } from "react-router-dom";
import { StyledButtonAuth, StyledLabel } from "./Register";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
export const AlertStyled = styled(Alert)((props) => ({
  backgroundColor: `${props.theme.colors.main}`,
  ">div": {
    color: "#fff",
  },
}));
const Login = () => {
  const [login, { data, isLoading, error }] = useLoginMutation();
  const { data: dataUser, refetch, currentData } = useUserQuery();
  const auth = useSelector((state) => state.auths.user);
  const uToken = useSelector((state) => state.auths.token);
  const navigate = useNavigate();
  const [isLogin, setIslogin] = useState(false);
  const nagivate = useNavigate();
  // const {
  // 	login,
  // 	authState: { user, isLoading, isAuthenticated },
  // } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  //submit
  const submit = async (event) => {
    event.preventDefault();
    try {
      const res = await login(loginForm).unwrap();

      await setToken(res?.token);
      console.log("res", res);
      if (res) {
        refetch();
        setTimeout(() => {
          setIslogin(true);
        }, 3000);
      }
      setTimeout(() => {
        if (res && dataUser) {
          // setRoleId(dataUser?.role?.roleName);
          // if (dataUser?.role?.roleName === "Admin") {
          //   navigate("/admin/product");
          // } else nagivate("/shop");
        }
      }, 2500);
      //  refresh();
    } catch (err) {
      console.log(err, error);
    }
  };
  useEffect(() => {
    console.log(dataUser);
    if (!!isLogin && !!auth) {
      setRoleId(auth?.role?.roleName);
      if (
        auth?.role?.roleName === "Admin" ||
        auth?.role === "6257f38a332c45395ccb8971"
      ) {
        navigate("/admin/overview");
      } else nagivate("/shop");
    }
  }, [isLogin]);
  const { email, password } = loginForm;
  const onChangeValue = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };
  const [color, setColor] = useState("#a749ff");
  let body;
  // const click = (value) => {
  // 	body = value === "1" ? login : register;
  // };
  // let register = <>reguster</>;

  body = (
    <>
      <Form
        className=" border p-5 mb-5"
        onSubmit={submit}
        style={{
          boxShadow: "0px 5px 16px -3px gray",
        }}
        // style={{
        //   WebkitBoxShadow: '0px -1px 20px 5px rgba(0,0,0,0.72)',
        //   boxShadow: '0px -1px 20px 5px rgba(0,0,0,0.72)',
        // }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <StyledLabel>Email address</StyledLabel>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            required
            value={email}
            onChange={onChangeValue}
          />
          <Form.Text className="text-muted">required</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <StyledLabel>Password</StyledLabel>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChangeValue}
          />
          <Form.Text className="text-muted">required</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            className="text-success d-flex align-items-center"
            label="Ghi nh??? ????ng nh???p"
          />
        </Form.Group>
        <StyledButtonAuth
          variant="danger"
          size="lg"
          className="py-2"
          type="submit"
        >
          <span style={{ fontWeight: 700 }}>Login</span>
        </StyledButtonAuth>
      </Form>
    </>
  );
  return (
    <>
      {error && (
        <AlertStyled variant="filled" color="info" severity="error">
          {error?.data?.message}
        </AlertStyled>
      )}
      {body}
      {isLoading && (
        <>
          <div className="d-flex justify-content-center mt-2 mb-5">
            <CircularProgress />{" "}
          </div>
        </>
      )}

      {error && error?.data?.message}
    </>
  );
};

export default Login;
