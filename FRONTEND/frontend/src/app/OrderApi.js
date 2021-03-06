import { apiURL } from "../Context/constant";
import axiosClient from "./AxiosClient";
const OrderApi = {
  create: (params) => {
    const url = `${apiURL}/order`;
    return axiosClient.post(url, { ...params });
  },
  update: (params) => {
    const url = `${apiURL}/order/${params.id}`;
    return axiosClient.put(url, params?.body);
  },
  myorder: (params) => {
    console.log(params);
    const url = `${apiURL}/order/myorder?userId=${params?.userId}`;
    return axiosClient.get(url);
  },
  payment: (params) => {
    const url = `${apiURL}/order/payment/${params.id}`;
    return axiosClient.get(url);
  },
  getall: (params) => {
    const url = `${apiURL}/order/getall`;
    return axiosClient.get(url, { params });
  },
};
export default OrderApi;
