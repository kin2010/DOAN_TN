import axios from "axios";
import { LOCAL_STORAGE_TOKEN_NAME, USER_ROLE } from "../Context/Constants";
export const getBaseURL = () => {
	return axios.create({
		baseURL:
			"https://cbcf880m45.execute-api.eu-central-1.amazonaws.com/production/v1/",
	});
};

export const getUser = () => {
	const userStr = localStorage.getItem("user");
	if (userStr) return JSON.parse(userStr);
	else return null;
};

export const getToken = () => {
	return localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME) || null;
};

export const getTokenType = () => {
	return localStorage.getItem("type") || null;
};

export const setUserSession = (token, type) => {
	localStorage.setItem("token", token);
	localStorage.setItem("type", type);
};

export const removeUserSession = () => {
	localStorage.removeItem("token");
};

export const getRoleID = () => {
	return localStorage.getItem(USER_ROLE) || null;
};
