import { Chip, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "reactstrap";
import { CategoryContext } from "../../../Context/CategoryContext";
import { ProductContext } from "../../../Context/ProductContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { finish, getOne, load, updateProduct } from "../../../Slice/ShopSlice";
import { useParams } from "react-router-dom";
import "./index.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axiosClient from "../../../app/AxiosClient";
import { apiURL } from "../../../Context/constant";
import Notification from "../../components/Notifacation/Notification";
const ChangeProduct = () => {
  const arr = [1, 2, 3, 4];

  const dispatch = useDispatch();
  const pdUpdate = useSelector((state) => state.products.pdUpdate);
  const { id } = useParams();
  const [validated, setValidated] = React.useState(false);
  const cates = useSelector((state) => state.category.subCategories);
  const trademarks = useSelector((state) => state.trademarks.trademark);
  const tags = useSelector((state) => state.tags.tags);
  const { closeToast, setShowToast } = React.useContext(CategoryContext);
  const [imgData, setImgData] = React.useState([]);
  const [files, setFile] = React.useState([]);
  const [listImg, setListImg] = useState([]);
  // data

  const isLoadingAdmin = useSelector((state) => state.products?.isLoadingAdmin);
  useEffect(() => {
    if (pdUpdate) {
      setListImg(pdUpdate?.detailImage);
    }
  }, [pdUpdate]);
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
  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (pdUpdate) {
      setFormValue({
        ...formValue,
        ...pdUpdate,
        category: pdUpdate?.category?._id || cates[0]?.categoryId,
        subCategory: pdUpdate?.subCategory?._id || cates[0]?._id,
        trademark: pdUpdate?.trademark?._id || trademarks[0]?._id,
        tag: pdUpdate?.tag || tags[0]?._id,
      });
    }
  }, [pdUpdate, cates, tags, trademarks]);

  const fetchProduct = async () => {
    try {
      const params = {
        id: id,
      };
      const action = getOne(params);
      await dispatch(action);
    } catch (error) {
      setShowToast({
        show: true,
        message: "Error !",
        color: "e",
      });
    }
  };
  const handleFormChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const onSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
      event.preventDefault();

      const arrImg = await fetchImage();
      const arrL = Object.values(listImg).filter((a) => a !== "");
      const imageDetail = arrL.concat(arrImg);
      let copy = [...imageDetail];
      imageDetail.splice(0, 1);
      console.log("mang cu", arrL);
      console.log("concat", copy);
      try {
        const params = {
          ...formValue,
          comments: pdUpdate?.comments,
          detailImage: files[0] ? imageDetail : copy,
          avatar: files[0] ? arrImg[0] : pdUpdate?.avatar,
        };

        // const res = await axiosClient.put(
        //   `${apiURL}/products/${pdUpdate?._id}`,
        //   params
        // );
        const action = updateProduct(params);
        const res = await dispatch(action);
        if (res) {
          setFile([]);
          setImgData([]);
          setListImg([]);
          setShowToast({
            show: true,
            message: "Update successfully !",
            color: "s",
          });
          closeToast();
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
  const fetchImage = async () => {
    try {
      const formData = new FormData();
      const arrUpload = Object.values(files).filter((a) => a !== undefined);
      arrUpload.forEach((element) => {
        formData.append("file", element);
      });
      const action1 = load();
      await dispatch(action1);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      };
      const res = await axiosClient.post(
        `${apiURL}/upload/multiple`,
        formData,
        config
      );
      console.log(res);
      const action2 = finish();
      await dispatch(action2);
      return res;
    } catch (error) {
      console.log(error);
      setShowToast({
        show: true,
        message: "Error !",
        color: "e",
      });
      closeToast();
    }
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

    if (!!listImg && listImg[index - 1] !== "") {
      let copy = [...Object.values(listImg)];
      copy.splice(index - 1, 1, "");

      setListImg({ ...copy });
    }
  };
  const handleDedete = (id) => {
    setImgData({
      ...imgData,
      [id]: undefined,
    });
    setFile({
      ...files,
      [id]: undefined,
    });

    if (!!listImg && listImg[id - 1] !== "") {
      let copy = [...Object.values(listImg)];
      copy.splice(id - 1, 1, "");

      setListImg({ ...copy });
    }
  };
  const handlePreview = (id) => {};
  return (
    <>
      {isLoadingAdmin && (
        <div className="loading">
          <LinearProgress style={{ width: "80%", height: "6px" }} />
        </div>
      )}
      <div>
        <Notification />
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
                  <div className="img-holder ">
                    <img
                      src={
                        imgData[0] || pdUpdate?.avatar || "../images/empty.png"
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
                    onChange={(e) => imageHandler(0, e)}
                    defaultValue={pdUpdate?.avatar}
                  />

                  <div className="mt-4 label-image text-center">
                    <label className="mb-3 image-upload" htmlFor="file">
                      Pick product avatar
                    </label>
                  </div>
                  <Form.Control.Feedback className="text-center" type="invalid">
                    Chọn ảnh cho sản phẩm
                  </Form.Control.Feedback>
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
            <div
              className="d-flex align-items-center "
              style={{
                flexWrap: "wrap",
                gap: "80px 20px",
              }}
            >
              {arr.map((ar, index) => (
                <div key={index} className="img-holder">
                  <img
                    src={
                      imgData[ar] ||
                      (listImg && listImg[ar - 1]) ||
                      "../images/empty.png"
                    }
                    alt=""
                    id="img"
                    className="img-content"
                  />
                  <div className="overlay d-flex align-items-center justify-content-center">
                    <Button className="pd-icon" onClick={handlePreview}>
                      <VisibilityIcon></VisibilityIcon>
                    </Button>
                    <Button
                      className="pd-icon"
                      onClick={() => handleDedete(ar)}
                    >
                      <DeleteOutlineIcon></DeleteOutlineIcon>
                    </Button>
                  </div>

                  <Form.Control
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="image"
                    id={`file${ar}`}
                    onChange={(e) => imageHandler(ar, e)}
                  />

                  <div className="mt-4 label-image text-center">
                    <label className="mb-3 image-upload" htmlFor={`file${ar}`}>
                      Pick product avatar
                    </label>
                  </div>
                </div>
              ))}
            </div>
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
              variant="primary"
              className=" w-100 py-3 mt-5"
              style={{ margintop: "200px", marginBottom: "50px" }}
            >
              {" "}
              UPDATE PRODUCT
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ChangeProduct;
