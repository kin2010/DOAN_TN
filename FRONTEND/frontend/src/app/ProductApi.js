import { apiURL } from '../Context/constant';
import axiosClient from './AxiosClient';
const ProductApi = {
  getAll: (params) => {
    const url = `${apiURL}/products/`;
    console.log(JSON.stringify(params));
    return axiosClient.get(url, { params });
  },
  getOne: (params) => {
    const url = `${apiURL}/products/${params.id}`;
    return axiosClient.get(url);
  },
};
export default ProductApi;