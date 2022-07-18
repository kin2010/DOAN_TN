import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ProductContext } from "../../../Context/ProductContext";
import { Col, Form, Row } from "react-bootstrap";
import { Label } from "reactstrap";
import { Chip, Divider } from "@mui/material";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { CategoryContext } from "../../../Context/CategoryContext";
import axiosClient from "../../../app/AxiosClient";
import { apiURL } from "../../../Context/constant";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Notification from "../Notifacation/Notification";
import { getAllProductAdmin } from "../../../Slice/ShopSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "94%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalCreate() {
  const dispatch = useDispatch();
  const { page, setPage, limit } = React.useContext(ProductContext);
  const [validated, setValidated] = React.useState(false);
  const cates = useSelector((state) => state.category.subCategories);
  const trademarks = useSelector((state) => state.trademarks.trademark);
  const tags = useSelector((state) => state.tags.tags);
  const { showToast, closeToast, setShowToast } =
    React.useContext(CategoryContext);
  const { showModal, setShowModal } = React.useContext(ProductContext);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [imgData, setImgData] = React.useState([]);
  const [files, setFile] = React.useState([]);
  const [formValue, setFormValue] = React.useState({
    name: "",
    category: "",
    trademark: Object.values(trademarks)?.length > 0 ? trademarks[0]._id : "",
    subCategory: Object.values(cates)?.length > 0 ? cates[0]._id : "",
    stock: 1,
    description: "",
    price: 1000,
    instruction: "",
    tag: tags ? (Object.values(tags)?.length > 0 ? tags[0]._id : "") : "",
  });

  const handleFormChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const imageHandler = (index, e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgData((imageinput) => ({
          ...imageinput,
          [index]: reader.result,
        }));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    files[index] = e.target.files[0];
    setFile({ ...files });
  };
  React.useEffect(() => {
    setFormValue({
      ...formValue,
      tag: tags ? (Object.values(tags)?.length > 0 ? tags[0]._id : "") : "",
      trademark: trademarks
        ? Object.values(trademarks)?.length > 0
          ? trademarks[0]._id
          : ""
        : "",
      subCategory: cates
        ? Object.values(cates)?.length > 0
          ? cates[0]._id
          : ""
        : "",
    });
  }, [cates, tags, trademarks]);
  const onSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
      event.preventDefault();
      try {
        const formData = new FormData();

        formData.append("file", files[0]);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        };
        const res = await axiosClient.post(
          `${apiURL}/upload/single`,
          formData,
          config
        );

        const params = {
          ...formValue,
          category: Object.values(cates).filter(
            (i) => i._id === formValue.subCategory
          )[0].categoryId,
          avatar: res?.url,
        };
        console.log(params);
        const res1 = await axiosClient.post(`${apiURL}/products`, params);
        console.log(res1, res);
        setShowToast({
          show: true,
          message: "Created !",
          color: "s",
        });
        try {
          const params = {
            limit: limit,
            skip: (page - 1) * limit,
          };
          const action = await getAllProductAdmin(params);
          await dispatch(action);
        } catch (error) {
          setShowToast({
            show: true,
            message: "Error !",
            color: "e",
          });
          setShowModal(false);
        }
        closeToast();
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
        resetForm();
      } catch (error) {
        console.log(error);
        setShowToast({
          show: true,
          message: "Error !",
          color: "e",
        });
        closeToast();
      }
    }
    console.log(formValue);
  };
  const resetForm = () => {
    setFormValue({
      ...formValue,
      name: "",
      price: 1000,
      stock: 1,
      description: "",
      instruction: "",
    });
  };
  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="md" style={{ overflowY: "scroll" }} sx={style}>
          {/* <Notification /> */}
          <div>
            <img className="img" src="../images/logo.png" alt="" />
          </div>
          <Divider className="py-3" />
          <Form noValidate validated={validated} onSubmit={onSubmit} id="form">
            <div>
              <Row>
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Label className="mb-3">Name</Label>
                    <Form.Control
                      name="name"
                      onChange={handleFormChange}
                      type="text"
                      placeholder="Enter address"
                      value={formValue.name}
                      required
                      min={5}
                      max={80}
                    />
                    <Form.Text className="text-muted">
                      Enter product name
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Label className="mb-3">Price</Label>
                    <Form.Control
                      name="price"
                      onChange={handleFormChange}
                      type="number"
                      required
                      min="1000"
                      placeholder="Enter address"
                      value={formValue.price}
                    />
                    <Form.Text className="text-muted">
                      Enter product price
                    </Form.Text>
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Label className="mb-3">Stock</Label>
                        <Form.Control
                          name="stock"
                          onChange={handleFormChange}
                          type="number"
                          required
                          min="1"
                          placeholder="Enter stock "
                          value={formValue.stock}
                        />
                        <Form.Text className="text-muted">
                          Enter product stock
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col>
                      <div
                        style={{ gap: "0 30px" }}
                        className="d-flex align-items-center justify-content-between"
                      >
                        <Form.Group className="mb-3" style={{ flexGrow: 3 }}>
                          <Label className="mb-3">Tag</Label>
                          <Form.Control
                            as="select"
                            size="lg"
                            id="form"
                            name="tag"
                            value={formValue.tag}
                            placeholder="tag"
                            required
                            onChange={handleFormChange}
                          >
                            {tags &&
                              tags.map((tag, index) => (
                                <option key={index} value={tag?._id}>
                                  {tag.name}
                                </option>
                              ))}
                          </Form.Control>
                          <Form.Text className="text-muted">
                            Product tag
                          </Form.Text>
                        </Form.Group>
                        <Chip
                          className="px-2"
                          label={
                            (tags &&
                              Object.values(tags).filter(
                                (i) => i._id === formValue.tag
                              )[0]?.name) ||
                            "hot"
                          }
                          style={{
                            color: "white",
                            backgroundColor:
                              tags &&
                              Object.values(tags).filter(
                                (i) => i._id === formValue.tag
                              )[0]?.color,
                          }}
                          variant="variant"
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group>
                    <Form.Label className="mb-2">Avatar</Form.Label>
                    <div
                      className="img-holder "
                      style={{ position: "relative" }}
                    >
                      <div className="mt-4 label-image text-center">
                        <label className="mb-3 image-upload" htmlFor="file">
                          Pick product avatar
                        </label>
                      </div>
                      <Form.Control.Feedback
                        className="text-center label-image"
                        type="invalid"
                      >
                        Chọn ảnh cho sản phẩm
                      </Form.Control.Feedback>
                      <img
                        src={
                          Object.values(imgData).length > 0
                            ? imgData[0]
                            : "../images/empty.png"
                        }
                        alt=""
                        id="img"
                        className="img-content"
                      />
                    </div>

                    <Form.Control
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      name="image"
                      id="file"
                      required
                      onChange={(e) => imageHandler(0, e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={6}>
                  <Form.Group className="mb-3">
                    <Label className="mb-3">Category</Label>
                    <Form.Control
                      as="select"
                      size="lg"
                      id="form"
                      name="subCategory"
                      value={formValue.subCategory}
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
                </Col>
                <Col md={6} sm={6}>
                  <Form.Group className="mb-3">
                    <Label className="mb-3">Brand</Label>
                    <Form.Control
                      as="select"
                      size="lg"
                      id="form"
                      name="trademark"
                      value={formValue.trademark}
                      placeholder="Trademark"
                      required
                      onChange={handleFormChange}
                    >
                      {trademarks &&
                        trademarks.map((trade, index) => (
                          <option key={index} value={trade?._id}>
                            {trade.name}
                          </option>
                        ))}
                    </Form.Control>
                    <Form.Text className="text-muted">Brand</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12} sm={12}>
                  <Label className="mb-3">Description</Label>
                  <Form.Group className="mb-3">
                    {/* <Form.Label className="mb-2">Description</Form.Label> */}
                    <Form.Control
                      name="description"
                      // style={{ width: "100%" }}
                      value={formValue.description}
                      onChange={handleFormChange}
                      required
                      as="textarea"
                      rows={7}
                    />
                    <Form.Text className="text-muted">Description</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12} sm={12}>
                  <Label className="mb-3">Instruction</Label>
                  <Form.Group className="mb-3">
                    {/* <Form.Label className="mb-2">Instruction</Form.Label> */}
                    <Form.Control
                      name="instruction"
                      // style={{ width: "100%" }}
                      value={formValue.instruction}
                      onChange={handleFormChange}
                      required
                      as="textarea"
                      rows={7}
                    />
                    <Form.Text className="text-muted">Instruction</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <div>
              <Button
                style={{ fontSize: "30px", gap: "0 30px" }}
                className="h2 submit text-primary d-flex justify-content-center align-items-center"
                variant="primary"
                type="submit"
              >
                <AddCircleOutlineIcon
                  style={{ fontSize: "30px" }}
                  color="primary"
                />
              </Button>
              <Button
                type="submit"
                variant="contained"
                className=" w-100 py-4 mt-5"
              >
                {" "}
                ADD PRODUCT
              </Button>
            </div>
          </Form>
        </Box>
      </Modal>
    </div>
  );
}
