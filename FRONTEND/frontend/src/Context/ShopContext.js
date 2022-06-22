import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../Slice/ShopSlice";
export const ShopContext = createContext();
const ShopContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const [conditionProduct, setCondition] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          limit: limit,
          skip: (page - 1) * limit,
          ...conditionProduct,
        };
        await dispatch(getAllProducts(params));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [conditionProduct, page]);
  const data = {
    setLimit,
    setPage,
    conditionProduct,
    setCondition,
  };
  return <ShopContext.Provider value={data}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
