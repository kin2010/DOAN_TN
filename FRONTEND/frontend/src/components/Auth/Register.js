import React, { useContext, useEffect, useState } from "react";
import { useRegisterMutation, useVerifyMutation } from "../../app/AuthApi";
import { Container, Button, Row, Col, Form, Spinner } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { reState } from "../../Slice/AuthSlice";
import { AlertStyled } from "./Login";
import { CategoryContext } from "../../Context/CategoryContext";
export const StyledLabel = styled(Form.Label)((props) => ({
  color: `${props.theme.colors.main}`,
}));
export const StyledButtonAuth = styled(Button)((props) => ({
  backgroundColor: `${props.theme.colors.main}`,
  width: "100%",
  color: "#fff",
}));
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let body;
  let bodyOTP;
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [otp, setOTP] = useState(0);
  const [register, { data, error, isLoading }] = useRegisterMutation();
  const [
    verify,
    { data: dataVerify, error: errorVerify, isLoading: LoadingVerify },
  ] = useVerifyMutation();
  const onchangeOTP = (event) => {
    setOTP(event.target.value);
  };
  const { setShowToast } = useContext(CategoryContext);
  const showOTP = useSelector((state) => state.auths.showOTP);
  const isVerify = useSelector((state) => state.auths.isVerify);
  useEffect(() => {
    if (isVerify && showOTP) {
      dispatch(reState());
      navigate("/login");
    }
  }, [isVerify]);

  useEffect(() => {
    if (!!showOTP) {
      dispatch(reState());
      navigate("/login");
      setShowToast({
        show: true,
        message: "Đăng kí thành công",
        color: "s",
      });
    }
  }, [showOTP]);

  const submitOTP = async (event) => {
    event.preventDefault();
    const params = {
      email: registerForm.email,
      otp: otp,
    };
    await verify(params);
    console.log(params, dataVerify);
  };
  //context
  //
  bodyOTP = (
    <>
      <Form
        style={{
          boxShadow: "0px 5px 16px -3px gray",
        }}
        className="border p-5 mb-5"
        onSubmit={submitOTP}
      >
        <Form.Group className="mb-3" controlId="formBasicOTP">
          <StyledLabel>Xác nhận OTP qua Gmail của bạn :</StyledLabel>
          <Form.Control
            type="number"
            placeholder="Enter OTP"
            name="otp"
            required
            value={otp}
            onChange={onchangeOTP}
          />
          <Form.Text className="text-muted">required</Form.Text>
        </Form.Group>

        <StyledButtonAuth variant="danger" type="submit">
          Xác nhận OTP
        </StyledButtonAuth>
      </Form>
    </>
  );
  const submit = async (event) => {
    event.preventDefault();
    await register(registerForm);
  };
  const { email, password, fullName } = registerForm;
  const onChangeValue = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  // const click = (value) => {
  // 	body = value === "1" ? login : register;
  // };
  // let register = <>reguster</>;
  body = (
    <>
      <Form
        style={{
          boxShadow: "0px 5px 16px -3px gray",
        }}
        className="border p-5 mb-5"
        onSubmit={submit}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <StyledLabel style={{ color: "#ff536f" }}>Email address</StyledLabel>
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
          <StyledLabel style={{ color: "#ff536f" }}>Password</StyledLabel>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChangeValue}
          />
          <Form.Text className="text-muted">required</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <StyledLabel style={{ color: "#ff536f" }}>Full Name</StyledLabel>
          <Form.Control
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={onChangeValue}
          />
          <Form.Text className="text-muted">required</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            className="text-success d-flex align-items-center"
            type="checkbox"
            label="Đồng ý điều khoản, chính sách"
          />
        </Form.Group>
        <StyledButtonAuth
          variant="danger"
          fullwidth="true"
          size="lg"
          className="py-2"
          type="submit"
        >
          <span style={{ fontWeight: 700, color: "#fff" }}>Register</span>
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
      {errorVerify && (
        <AlertStyled variant="filled" color="info" severity="error">
          {errorVerify?.data?.message}
        </AlertStyled>
      )}
      {!showOTP && body}
      {/* {showOTP && } */}
      {isLoading && (
        <>
          <div className="d-flex justify-content-center mt-2 mb-5">
            <CircularProgress />{" "}
          </div>
        </>
      )}
      {LoadingVerify && (
        <>
          <div className="d-flex justify-content-center mt-2 mb-5">
            <CircularProgress />{" "}
          </div>
        </>
      )}

      {/* {error && error?.data?.message}
      {errorVerify && errorVerify?.data?.message} */}
    </>
  );
};

export default Register;
