import { CAvatar } from "@coreui/react";
import { LinearProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Label } from "reactstrap";
import { useUserQuery } from "../../app/AuthApi";
import axiosClient from "../../app/AxiosClient";
import { CategoryContext } from "../../Context/CategoryContext";
import { apiURL } from "../../Context/constant";

const ChangeProfile = () => {
  const { setShowToast, loadingGlobal, setLoadingGlobal } =
    useContext(CategoryContext);
  const { data: user, refetch } = useUserQuery();
  const [validated, setValidated] = React.useState(false);
  const [imgData, setImgData] = useState([]);
  const [file, setFile] = useState([]);
  const [formValue, setFormValue] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    address: user?.address || "",
    avatar: user?.avatar || "",
  });
  useEffect(() => {
    if (user) {
      setFormValue({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        gender: user?.gender || "",
        address: user?.address || "",
        avatar: user?.avatar || "",
      });
    }
  }, [user]);
  const handleFormChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const onSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
      event.preventDefault();
      updateuser();
    }
    // console.log(formValue, user);
  };
  const updateuser = async () => {
    try {
      const formData = new FormData();
      setLoadingGlobal(true);
      formData.append("file", file[0]);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      };
      let resImage = null;
      console.log(file.length, file);
      if (file.length > 0) {
        resImage = await axiosClient.post(
          `${apiURL}/upload/single`,
          formData,
          config
        );
      }

      let params = { ...formValue };
      if (resImage) {
        params = { ...params, avatar: resImage?.url };
      }
      console.log(params);
      const res = await axiosClient.put(`${apiURL}/auth/${user?._id}`, params);
      if (res) {
        setShowToast({
          show: true,
          color: "s",
          message: "Updated !",
        });
        setLoadingGlobal(false);
        await refetch();
        setFile([]);
      }
    } catch (error) {
      setLoadingGlobal(false);
      setShowToast({
        show: true,
        color: "e",
        message: "Error !",
      });
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

    setFile([e.target.files[0]]);
  };
  return (
    <div className="bg-white">
      <Form noValidate validated={validated} onSubmit={onSubmit} id="form">
        <div className="d-flex">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Label className="mb-3">Name</Label>
              <Form.Control
                name="fullName"
                onChange={handleFormChange}
                type="text"
                placeholder="Enter full name"
                value={formValue.fullName}
                required
                min={5}
                max={80}
              />
            </Form.Group>
            <Form.Group className="mb-3 inputcustom">
              <Label className="mb-3">Email</Label>
              <Form.Control
                name="email"
                onChange={handleFormChange}
                type="email"
                placeholder="Enter your email"
                value={formValue.email}
                required
                min={5}
                max={80}
              />
            </Form.Group>
            <Form.Group className="mb-3 inputcustom">
              <Label className="mb-3">Phone</Label>
              <Form.Control
                name="phone"
                onChange={handleFormChange}
                type="number"
                placeholder="Enter your phone number"
                value={formValue.phone}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Label className="mb-3">Address</Label>
              <Form.Control
                name="address"
                onChange={handleFormChange}
                type="text"
                placeholder="Enter your address"
                value={formValue.address}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex justify-content-start align-items-center">
              <Col>
                <Form.Check
                  name="gender"
                  type={"radio"}
                  id={`man`}
                  label={`man`}
                  value="man"
                  checked={formValue.gender === "man"}
                  onChange={handleFormChange}
                />
              </Col>
              <Col>
                <Form.Check
                  name="gender"
                  type={"radio"}
                  id={`woman`}
                  label={`woman`}
                  checked={formValue.gender === "woman"}
                  onChange={handleFormChange}
                  value="woman"
                />
              </Col>
            </Form.Group>
            <Button className="w-100 fw700 mt-4" type="submit">
              Update Profile
            </Button>
          </Col>
          <Col md={1}></Col>
          <Col md={5}>
            <Form.Group>
              <Form.Label className="mb-2">Avatar</Form.Label>
              <div className="img-holder2 ">
                <CAvatar
                  className="w-100 img-content"
                  src={
                    imgData[0] ||
                    user?.avatar ||
                    "https://res.cloudinary.com/drvb2kjug/image/upload/v1657722820/doantotnghiep/empty_iasoc5.jpg"
                  }
                />
                <div className="mt-4 label-image text-center">
                  <label className="mb-3 label-file" htmlFor="file">
                    Choose Avatar
                  </label>
                </div>
              </div>

              <Form.Control
                type="file"
                accept=".png, .jpg, .jpeg"
                name="image"
                id="file"
                onChange={(e) => imageHandler(0, e)}
              />

              <Form.Control.Feedback className="text-center" type="invalid">
                Chọn ảnh cho sản phẩm
              </Form.Control.Feedback>
            </Form.Group>
            {loadingGlobal && (
              <div className="mt-5">
                <LinearProgress />
              </div>
            )}
            {/* <h2 dangerouslySetInnerHTML={{ __html: htmlText }}></h2> */}
          </Col>
        </div>
        <div></div>
      </Form>
    </div>
  );
};

export default ChangeProfile;
