import React, { useState, useContext } from "react";
import { Container, Button, Row, Col, Form, Spinner } from "react-bootstrap";
import { AuthContext } from "../../Context/AuthContext";
import "./Login.css";
const Login = () => {
	const {
		login,
		authState: { user, isLoading, isAuthenticated },
	} = useContext(AuthContext);
	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
	});
	//submit
	const { setShowToast } = useContext(AuthContext);
	const submit = async (event) => {
		event.preventDefault();
		try {
			const response = await login(loginForm);
			console.log(response.data.user);
			//data : response.data  (user,token)
		} catch (error) {
			// setShowToast({
			// 	show: true,
			// 	type: "danger",
			// 	message: error.message,
			// });
		}
	};
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
	const click = () => {
		console.log(isLoading, user, isAuthenticated);
	};
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
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Ghi nhớ đăng nhập" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</>
	);
	return (
		<>
			{body}
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

export default Login;
