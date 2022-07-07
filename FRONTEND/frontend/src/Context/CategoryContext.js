import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosClient from "../app/AxiosClient";
import { getAllCategories, getAllSub } from "../Slice/CategorySlice";
import { getallOrder } from "../Slice/OrderSlice";
import { getTags } from "../Slice/TagSlice";
import { getTrademarkApi } from "../Slice/Trademark";
import { apiURL } from "./constant";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [tags, setTag] = useState([]);
  const [pageOrder, setPageOrder] = useState(1);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    color: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    fetchCategory();
    fetchSub();
    getTrademark();
    getTag();
  }, []);
  useEffect(() => {
    getOrder();
  }, [pageOrder]);
  const fetchCategory = async () => {
    try {
      const action = getAllCategories();
      await dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSub = async () => {
    try {
      const action = getAllSub();
      await dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  const getTrademark = async () => {
    try {
      const action = getTrademarkApi();
      await dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  const getTag = async () => {
    try {
      const action = getTags();
      await dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  const getOrder = async () => {
    try {
      const params = {
        limit: 5,
        skip: pageOrder * 5,
      };
      console.log(params);
      const action = getallOrder(params);
      await dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  const closeToast = () => {
    setTimeout(() => {
      setShowToast({
        show: false,
        message: "",
        color: "",
      });
    }, 4000);
  };

  const data = {
    pageOrder,
    setPageOrder,
    closeToast,
    showToast,
    setShowToast,
    tags,
    setTag,
  };
  return (
    <CategoryContext.Provider value={data}>{children}</CategoryContext.Provider>
  );
};
export default CategoryContextProvider;
