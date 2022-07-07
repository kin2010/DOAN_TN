import { Box, Modal, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "reactstrap";
import axiosClient from "../../../app/AxiosClient";
import { CategoryContext } from "../../../Context/CategoryContext";
import { apiURL } from "../../../Context/constant";
import { ProductContext } from "../../../Context/ProductContext";
import { getAllCategories, getAllSub } from "../../../Slice/CategorySlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ModalCate = () => {
  const dispatch = useDispatch();
  const { showToast, closeToast, setShowToast } =
    React.useContext(CategoryContext);
  const cates = useSelector((state) => state.category.categories);
  const {
    handle,
    setHandle,
    cateUpdate,
    setCateUpdate,
    showModalCate,
    setShowModalCate,
  } = useContext(ProductContext);
  const handleClose = () => {
    setShowModalCate(false);
  };
  const [formValue, setFormvl] = useState({
    name: "",
    description: "",
    categoryId: "",
  });
  useEffect(() => {
    if (cateUpdate) {
      setFormvl({
        ...formValue,
        name: cateUpdate?.name,
        description: cateUpdate?.description,
        categoryId: cateUpdate?.categoryId,
      });
    }
  }, [cateUpdate]);
  const handleFormChange = (e) => {
    setFormvl({ ...formValue, [e.target.name]: e.target.value });
  };
  const submit = async () => {
    console.log(formValue);
    if (handle === "updateCate") {
      const params = {
        name: formValue?.name,
        description: formValue?.description,
      };
      try {
        const res = await axiosClient.put(
          `${apiURL}/category/${cateUpdate?._id}`,
          params
        );
        if (res) {
          setShowToast({
            show: true,
            message: "Added !",
            color: "s",
          });
          closeToast();
          await fetchCategory();
          setShowModalCate(false);
        }
      } catch (error) {
        setShowToast({
          show: true,
          message: "Error !",
          color: "e",
        });
        closeToast();
      }
    }
    if (handle === "addCate") {
      const params = {
        name: formValue.name,
        description: formValue.description,
      };
      try {
        const res = await axiosClient.post(`${apiURL}/category`, params);
        if (res) {
          setShowToast({
            show: true,
            message: "Added !",
            color: "s",
          });
          closeToast();
          await fetchCategory();
          setShowModalCate(false);
        }
      } catch (error) {
        setShowToast({
          show: true,
          message: "Error !",
          color: "e",
        });
        closeToast();
      }
    }
    if (handle === "addSub") {
      const params = {
        name: formValue.name,
        description: formValue.description,
        categoryId: formValue?.categoryId,
      };
      try {
        const res = await axiosClient.post(`${apiURL}/category/addSub`, params);
        if (res) {
          setShowToast({
            show: true,
            message: "Added !",
            color: "s",
          });
          closeToast();
          await fetchSub();
          setShowModalCate(false);
        }
      } catch (error) {
        setShowToast({
          show: true,
          message: "Error !",
          color: "e",
        });
        closeToast();
      }
    }
    if (handle === "updateSub") {
      const params = {
        name: formValue.name,
        description: formValue.description,
        categoryId: formValue?.categoryId,
      };
      try {
        const res = await axiosClient.put(
          `${apiURL}/category/subs/${cateUpdate?._id}`,
          params
        );
        if (res) {
          setShowToast({
            show: true,
            message: "Updated !",
            color: "s",
          });
          closeToast();
          await fetchSub();
          setShowModalCate(false);
        }
      } catch (error) {
        setShowToast({
          show: true,
          message: "Error !",
          color: "e",
        });
        closeToast();
      }
    }
  };
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
  return (
    <>
      <Modal
        open={showModalCate}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Form>
            <Form.Group className="mb-3">
              <Label className="mb-3">Price</Label>
              <Form.Control
                name="name"
                onChange={handleFormChange}
                type="text"
                required
                placeholder="Enter category name"
                value={formValue.name}
              />
              <Form.Text className="text-muted">Enter category name</Form.Text>
            </Form.Group>

            {handle === "addSub" ||
              (handle === "updateSub" && (
                <Form.Group className="mb-3">
                  <Label className="mb-3">Category</Label>
                  <Form.Control
                    as="select"
                    size="lg"
                    id="form"
                    name="categoryId"
                    value={formValue.categoryId}
                    placeholder="Category"
                    required
                    onChange={handleFormChange}
                  >
                    {cates &&
                      cates.map((cate, index) => (
                        <option key={index} value={cate?._id}>
                          {cate.name}
                        </option>
                      ))}
                  </Form.Control>
                  <Form.Text className="text-muted">Category</Form.Text>
                </Form.Group>
              ))}

            <Label className="mb-3">Description</Label>
            <Form.Group className="mb-3">
              <Form.Control
                name="description"
                value={formValue.description}
                onChange={handleFormChange}
                required
                as="textarea"
                rows={4}
              />
              <Form.Text className="text-muted">Description</Form.Text>
            </Form.Group>
            <Button
              onClick={() => submit()}
              className="w-100 py-2 font-bold"
              style={{ fontWeight: 700, fontSize: "20px" }}
            >
              Submit
            </Button>
          </Form>
        </Box>
      </Modal>
    </>
  );
};

export default ModalCate;
