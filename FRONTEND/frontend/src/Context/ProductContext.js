import { createContext, useState } from "react";

export const ProductContext = createContext();
const ProductContextProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [show, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCate, setShowModalCate] = useState(false);
  const [cateUpdate, setCateUpdate] = useState([]);
  const [handle, setHandle] = useState("updateCate");
  const [showModalReview, setShowReivew] = useState(false);
  const data = {
    page,
    setPage,
    limit,
    setLimit,
    show,
    setShowAlert,
    showModal,
    setShowModal,
    showModalCate,
    setShowModalCate,
    cateUpdate,
    setCateUpdate,
    handle,
    setHandle,
    showModalReview,
    setShowReivew,
  };
  return (
    <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
  );
};
export default ProductContextProvider;
