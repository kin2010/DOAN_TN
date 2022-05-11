import { apiURL } from '../Context/constant';
import axiosClient from './AxiosClient';
const CategoriesApi = {
  getAll: (params) => {
    const url = `${apiURL}/category/getall`;
    return axiosClient.get(url);
  },
  getAllSub: (params) => {
    const url = `${apiURL}/category/getallsub`;
    return axiosClient.get(url);
  },
};
export default CategoriesApi;
