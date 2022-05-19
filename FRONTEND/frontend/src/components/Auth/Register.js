import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Row, Col, Form, Spinner } from "react-bootstrap";
import { AuthContext } from "../../Context/AuthContext";
const Register = () => {
	const { register, verify } = useContext(AuthContext);
	const {
		authState: { user, isLoading, isAuthenticated },
		setShowToast,
	} = useContext(AuthContext);
	let body;
	let bodyOTP;
	const history = useHistory();
	const [registerForm, setRegisterForm] = useState({
		email: "",
		password: "",
		fullName: "",
	});
	const [showOTP, setShowOTP] = useState(false);
	const [otp, setOTP] = useState(0);
	const onchangeOTP = (event) => {
		setOTP(event.target.value);
	};
	const submitOTP = async (event) => {
		event.preventDefault();
		try {
			let otpForm = {
				email: email,
				otp: otp,
			};
			const response = await verify(otpForm);
			if (response?.status === 200) {
				setShowToast({
					show: true,
					type: "success",
					message: "Đăng kí thành công ",
				});
				history.push("/login");
			}
			console.log(response);
		} catch (error) {
			setShowToast({
				show: true,
				type: "danger",
				message: "Xảy ra lỗi !",
			});
		}
	};
	//context
	//
	bodyOTP = (
		<>
			<Form className="border p-5 mb-5" onSubmit={submitOTP}>
				<Form.Group className="mb-3" controlId="formBasicOTP">
					<Form.Label>Xác nhận OTP qua Gmail của bạn :</Form.Label>
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

				<Button variant="primary" type="submit">
					Xác nhận OTP
				</Button>
			</Form>
		</>
	);
	const submit = async (event) => {
		event.preventDefault();
		try {
			const response = await register(registerForm);
			if (response.status === 201) {
				console.log("waiting otp");
				// set otp
				setShowOTP(true);

				//	console.log(bodyOTP);
			} else {
				//Email is used
				console.log(response);
			}
		} catch (error) {
			console.log(error);
		}
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
			<Form className="border p-5 mb-5" onSubmit={submit}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
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
					<Form.Label>Password</Form.Label>
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
					<Form.Label>Full Name</Form.Label>
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
						type="checkbox"
						label="Đồng ý điều khoản, chính sách"
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Register
				</Button>
			</Form>
		</>
	);
	return (
		<>
			{!showOTP && body}
			{showOTP && bodyOTP}
			{isLoading && (
				<>
					<div className="d-flex justify-content-center mt-2 mb-5">
						<Spinner animation="border" variant="info" />
					</div>
				</>
			)}
		</>
	);
};

export default Register;
