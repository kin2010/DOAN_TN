import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../Slice/ShopSlice';
export const ShopContext = createContext();
const ShopContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [subProducts, setSubProduct] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          subCategory: subProducts,
          limit: limit,
          skip: (page - 1) * limit,
        };
        await dispatch(getAllProducts(params));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [subProducts, page]);
  const data = {
    subProducts,
    setSubProduct,
  };
  return <ShopContext.Provider value={data}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
