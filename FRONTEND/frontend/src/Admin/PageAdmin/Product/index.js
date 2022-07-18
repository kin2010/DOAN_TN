import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Button, ButtonGroup, Dropdown, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { ProductContext } from "../../../Context/ProductContext";
import { getAllProductAdmin } from "../../../Slice/ShopSlice";
import TbRow from "../../components/TableRow";
import AddBoxIcon from "@mui/icons-material/AddBox";
import "./index.scss";
import ModalCreate from "../../components/Modal";
const ProductAdmin = () => {
  const { setBread } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [age, setAge] = React.useState("");
  const { page, setPage, limit, showModal, setShowModal } =
    useContext(ProductContext);
  const pd = useSelector((state) => state.products.pdAdmin);
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event.target.value);
  };
  useEffect(() => {
    setBread("product");
  }, [setBread]);
  useEffect(() => {
    setBread("product");
    f1();
  }, [limit, page]);
  const f1 = async () => {
    try {
      const params = {
        limit: limit,
        skip: (page - 1) * limit,
      };
      const action = await getAllProductAdmin(params);
      await dispatch(action);
    } catch (error) {}
  };
  const handlePageChange = (e, page) => {
    setPage(page);
  };
  const handleAdd = () => {
    setShowModal(true);
  };
  return (
    <>
      <ModalCreate></ModalCreate>
      <div className="mb-3 d-flex justify-content-between">
        <TextField id="standard-basic" label="Search" variant="standard" />
        {/* <FormControl sx={{ m: 1, minWidth: 240 }}>
          <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>With label + helper text</FormHelperText>
        </FormControl> */}
        <div onClick={handleAdd} className="d-flex align-items-center btn_add">
          <AddBoxIcon fontSize="large" color="primary" />
          <Button color="primary" variant="outlined">
            <p style={{ fontSize: "19px" }}>Add Product</p>
          </Button>
        </div>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>TradeMark</th>
              <th>Price</th>
              <th>Sell</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pd.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <div
                    style={{ minHeight: "190px" }}
                    className="text-success d-flex justify-content-center"
                  >
                    EMPTY
                  </div>
                </td>
              </tr>
            )}
            {pd.length > 0 &&
              pd.map((p, index) => <TbRow key={index} {...p}></TbRow>)}
          </tbody>
        </Table>
      </div>
      <div className="mt-5 pb-3 d-flex align-items-center justify-content-between">
        <Pagination
          onChange={(e, page) => handlePageChange(e, page)}
          count={10}
          color="secondary"
          defaultPage={1}
        />
        <p className="m0">Showing {pd.length} entries</p>
      </div>
    </>
  );
};

export default ProductAdmin;
