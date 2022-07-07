import { apiURL } from "../Context/constant";
import axiosClient from "./AxiosClient";
const ProductApi = {
  getAll: (params) => {
    const url = `${apiURL}/products/`;
    return axiosClient.get(url, { params });
  },
  getOne: (params) => {
    const url = `${apiURL}/products/${params.id}`;
    return axiosClient.get(url);
  },
  create: (params) => {
    const url = `${apiURL}/products`;
    return axiosClient.post(url, { params });
  },
  update: (params) => {
    const url = `${apiURL}/products/${params._id}`;
    return axiosClient.put(url, { ...params });
  },
};
export default ProductApi;
