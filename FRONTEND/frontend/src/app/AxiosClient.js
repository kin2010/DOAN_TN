import axios from 'axios';
import { apiURL } from '../Context/constant';
import { LOCAL_STORAGE_TOKEN_NAME, USER_ROLE } from '../Context/Constants';
export const getBaseURL = () => {
  return axios.create({
    baseURL: apiURL,
  });
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
};

export const getToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME) || null;
};

export const getTokenType = () => {
  return localStorage.getItem('type') || null;
};

export const setUserSession = (token, type) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, token);
  localStorage.setItem('type', type);
};

export const removeUserSession = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
};

export const getRoleID = () => {
  return localStorage.getItem(USER_ROLE) || null;
};
