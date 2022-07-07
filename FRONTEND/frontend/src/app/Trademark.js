import { apiURL } from "../Context/constant";
import axiosClient from "./AxiosClient";
const TrademarkApi = {
  get: (params) => {
    const url = `${apiURL}/trademark`;
    return axiosClient.get(url);
  },
};
export default TrademarkApi;
