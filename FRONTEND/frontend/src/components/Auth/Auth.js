import React, { useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import { Redirect, useHistory } from "react-router";
import Navi from "../../HomePage/Navi";
import Footer from "../../HomePage/Footer";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext.js";
import Toasts from "../Toast/Toast.js";
import { getRoleID } from "../../Utils/Common.js";
const Auth = ({ auth }) => {
	const history = useHistory();
	let body;
	let label;
	const {
		authState: { isAuthenticated },
	} = useContext(AuthContext);
	if (isAuthenticated) {
		if (getRoleID() === "Admin") {
			return <Redirect to="/admin/overview" />;
		} else return <Redirect to="/shop" />;
	}
	label = (
		<>
			{auth == "login" && (
				<>
					{" "}
					<span style={{ color: "#a749ff", fontWeight: 900 }}>
						Login
					</span>{" "}
					<span>| </span>
					<span
						onClick={() => {
							history.push("/register");
						}}
						style={{ fontWeight: 900 }}
					>
						{" "}
						Register
					</span>
				</>
			)}
			{auth == "register" && (
				<>
					{" "}
					<span
						onClick={() => {
							history.push("/login");
						}}
						style={{ fontWeight: 900 }}
					>
						Login
					</span>
					<span>| </span>
					<span style={{ color: "#a749ff", fontWeight: 900 }}>
						Register
					</span>
				</>
			)}
		</>
	);
	body = (
		<>
			{auth == "login" && <Login></Login>}
			{auth == "register" && <Register></Register>}
		</>
	);
	return (
		<>
			<Navi></Navi>
			<Container fuild="true">
				<Row className="justify-content-center mt-5">
					<Col md={6}>
						<div
							style={{
								textAlign: "center",
								fontSize: 30,
								cursor: "pointer",
								fontFamily: "Poppins,sans-serif",
							}}
							className="mb-4"
						>
							{label}
						</div>
						{body}
					</Col>
				</Row>
				<Toasts></Toasts>
			</Container>
			<Footer></Footer>
		</>
	);
};

export default Auth;
