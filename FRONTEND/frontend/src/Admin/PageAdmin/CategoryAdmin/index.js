import React, { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ProductContext } from "../../../Context/ProductContext";
import Notification from "../../components/Notifacation/Notification";
import ModalCate from "./ModalCate";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const CategoryAdmin = () => {
  const subs = useSelector((state) => state.category.subCategories);
  const cates = useSelector((state) => state.category.categories);
  const { handle, setHandle, setCateUpdate, showModalCate, setShowModalCate } =
    useContext(ProductContext);

  const handleUpdate = (id) => {
    setShowModalCate(true);
    setCateUpdate(Object.values(cates).filter((a) => a._id === id)[0]);
    setHandle("updateCate");
  };
  const handleUpdateSub = (id) => {
    setShowModalCate(true);
    setCateUpdate(Object.values(subs).filter((a) => a._id === id)[0]);
    setHandle("updateSub");
  };
  const handleAddCate = () => {
    setShowModalCate(true);
    setCateUpdate([]);
    setHandle("addCate");
  };
  const handleAddSub = () => {
    setShowModalCate(true);
    setCateUpdate([]);
    setHandle("addSub");
  };
  return (
    <>
      <Notification />
      <ModalCate />
      <h2 className="cate-title mb-5"> Category</h2>
      <div className="d-flex justify-content-start mb-5">
        <Button
          onClick={handleAddCate}
          className="px-2 d-flex align-items-center"
          style={{ fontSize: "30px", gap: "0 15px" }}
        >
          {" "}
          <AddCircleIcon />
          Add
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!!cates &&
            Object.values(cates).map((cate, index) => (
              <tr>
                <td>{cate?._id?.toString().slice(-5)}</td>
                <td>{cate?.name}</td>
                <td>{cate?.description}</td>
                <td>
                  <Button onClick={() => handleUpdate(cate?._id)}>
                    <i className="me-2 fas fa-edit"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <h2 className="cate-title mb-5">Sub Category</h2>
      <div className="d-flex justify-content-start mb-5">
        <Button
          onClick={handleAddSub}
          className="px-2 d-flex align-items-center"
          style={{ fontSize: "30px", gap: "0 15px" }}
        >
          {" "}
          <AddCircleIcon />
          Add
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!!subs &&
            Object.values(subs).map((cate, index) => (
              <tr>
                <td>{cate?._id?.toString().slice(-5)}</td>
                <td>{cate?.name}</td>
                <td>{cate?.description}</td>
                <td>{cate?.categoryId}</td>
                <td>
                  <Button onClick={() => handleUpdateSub(cate?._id)}>
                    <i className="me-2 fas fa-edit"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default CategoryAdmin;
