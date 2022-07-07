import { apiURL } from "../Context/constant";
import axiosClient from "./AxiosClient";
const TagApi = {
  get: (params) => {
    const url = `${apiURL}/tag`;
    return axiosClient.get(url);
  },
  create: (params) => {
    const url = `${apiURL}/tag`;
    return axiosClient.post(url, { params });
  },
};
export default TagApi;
