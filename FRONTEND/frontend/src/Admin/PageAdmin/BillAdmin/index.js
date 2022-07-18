import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../../../Utils/func";
import { useNavigate } from "react-router-dom";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import "antd/dist/antd.css";
import {
  Avatar,
  Button,
  Divider,
  Modal,
  Pagination,
  Typography,
} from "@mui/material";
import { CategoryContext } from "../../../Context/CategoryContext";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { CAvatar } from "@coreui/react";
import { Box } from "@mui/system";
import {
  deliveryAction,
  getallOrder,
  updateOrder,
} from "../../../Slice/OrderSlice";
import { Form } from "react-bootstrap";
import { Select } from "antd";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
export const ORDER_STATUS = {
  pending: "#81ab00",
  shipping: "blue",
  done: "#43cf20",
  over: "red",
  paid: "#b420cf",
  not_paid: "red",
};

export const mapStatus = (status) => {
  return (
    <p style={{ color: ORDER_STATUS[status], fontSize: "20px" }}>
      {status.toString().toUpperCase()}
    </p>
  );
};
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function BasicTable() {
  const dispatch = useDispatch();
  const { setShowToast } = React.useContext(CategoryContext);
  const [show, setShow] = React.useState(false);
  const [id, setId] = React.useState("");
  const { pageOrder, setPageOrder } = React.useContext(CategoryContext);
  const orders = useSelector((state) => state.orders.orders);
  const navigate = useNavigate();
  const delivery = useSelector((state) => state.orders.delivery);
  const handlePageChange = (e, page) => {
    setPageOrder(page);
  };
  const handleDelivery = async (idd) => {
    setId(idd);
    const action = deliveryAction(idd);
    await dispatch(action);
    setShow(true);
  };
  const handleClose = (id) => {
    setShow(false);
  };
  const [form, setForm] = React.useState({
    currentLocation: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { Option } = Select;

  const onChange = (value) => {
    // console.log(`selected ${value}`);
    setForm({ currentLocation: value });
  };

  const onSearch = (value) => {
    // console.log("search:", value);
  };
  const submit = () => {
    console.log(form);
    upOrder();
    setTimeout(() => {
      getOrder();
      setShow(false);
      setForm({
        currentLocation: "",
      });
    }, 1000);
  };
  const getOrder = async () => {
    try {
      const params = {
        limit: 5,
        skip: (pageOrder - 1) * 5,
      };

      const action = getallOrder(params);
      await dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  const upOrder = async () => {
    let params = {};
    try {
      if (
        form?.currentLocation[0] === delivery.deliveryAddress &&
        delivery?.isPaid === true
      ) {
        params = {
          id: delivery._id,
          body: {
            currentAddress: form?.currentLocation[0],
            status: "done",
            deliveryTime: new Date().toISOString(),
          },
        };
      } else if (
        form?.currentLocation[0] === delivery.deliveryAddress &&
        delivery?.isPaid === false
      ) {
        params = {
          id: delivery._id,
          body: {
            currentAddress: form?.currentLocation[0],
            status: "not_paid",
            deliveryTime: new Date().toISOString(),
          },
        };
      } else {
        params = {
          id: delivery._id,
          body: {
            currentAddress: form?.currentLocation[0],
            status: "shipping",
            deliveryTime: new Date().toISOString(),
          },
        };
      }

      const action2 = updateOrder(params);
      await dispatch(action2);
      setShowToast({
        show: true,
        message: "Cập nhật đơn hàng thành công",
        color: "s",
      });
    } catch (error) {
      console.log(error);
      setShowToast({
        show: true,
        message: "Error !",
        color: "e",
      });
    }
  };
  return (
    <>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cập nhật vị trí đơn hàng {id}
          </Typography>

          <div
            className="mt-3 mb-5 w-100"
            style={{ borderBottom: "1px solid gray" }}
          />
          <div>
            <div className="mb-2">Người gửi :</div>
            <div className="fw500">------------ Mỹ phẩm Comestic</div>
            <div className="mb-2">Địa chỉ :</div>
            <div className="mb-3 fw500"> 54 Nguyễn Lương Bằng</div>
            <div className="mb-2">Người nhận :</div>
            <div className="d-flex align-item-center mb-2">
              <div>------------</div>
              <Avatar
                alt="Remy Sharp "
                className="me-2"
                src={delivery?.user?.avatar}
              />
              <div>{delivery?.user?.fullName}</div>
            </div>
            <div className="mb-2">Nơi nhận hàng :</div>
            <div className="mb-3 fw500"> {delivery?.deliveryAddress}</div>
          </div>
          <div
            className="mt-3 mb-5 w-100"
            style={{ borderBottom: "1px solid gray" }}
          />
          <div> Vị trí hiện tại</div>
          <Select
            className="see"
            showSearch
            mode="tags"
            style={{
              padding: "25px 15px",
              minWidth: "400px",
            }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            autoClearSearchValue={false}
            // value={form.currentLocation}
            onSearch={onSearch}
            filterOption={(input, option) => {
              console.log(input, option);
              option.children.toLowerCase().includes(input.toLowerCase());
            }}
          >
            <Option value={delivery?.deliveryAddress}>
              {delivery?.deliveryAddress}
            </Option>
          </Select>
          {/* <Form.Group>
            <Form.Label>Đơn hàng đang tại :</Form.Label>
            <Form.Control
              name="currentLocation custominput"
              value={form.currentLocation}
              onChange={handleChange}
            />
          </Form.Group> */}
          <div
            className="mt-3 mb-2 w-100"
            style={{ borderBottom: "1px solid gray" }}
          />
          <div>
            <Button
              variant="outlined"
              className="mt-4 fs700 d-flex align-item-center"
              onClick={submit}
            >
              <LocalShippingIcon className="text-success me-4" />
              <div className="fs16">SUBMIT</div>
            </Button>
          </div>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Customer</TableCell>
              <TableCell align="right">Delivery Address</TableCell>
              <TableCell align="right">Current address </TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <div
                    style={{ minHeight: "190px" }}
                    className="text-success
                    
                    d-flex justify-content-center"
                  >
                    EMPTY
                  </div>
                </td>
              </tr>
            )}
            {!!orders &&
              Object.values(orders).map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className="hover fs18"
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => navigate(`/order/${row?._id}`)}
                  >
                    {row?._id.toString().slice(-5)}
                  </TableCell>
                  <TableCell align="right d-flex align-item-center flex-row">
                    <Avatar
                      alt="Remy Sharp "
                      className="me-2"
                      src={row?.user?.avatar}
                    />
                    <div> {row?.user?.fullName}</div>
                  </TableCell>
                  <TableCell align="right">
                    {row?.deliveryAddress || "_______"}
                  </TableCell>
                  <TableCell align="right">
                    {row?.currentAddress || "_______"}
                  </TableCell>
                  <TableCell align="right">
                    {`${formatNumber(row?.totalPrice)} đ`}
                  </TableCell>
                  <TableCell align="center">{mapStatus(row?.status)}</TableCell>
                  <TableCell align="center">
                    <div className="d-flex align-item-center">
                      <Button
                        className="d-flex align-item-center"
                        onClick={() => handleDelivery(row?._id)}
                      >
                        <EditLocationAltIcon
                          fontSize="large"
                          className="text-success me-1"
                        />
                        {/* <LocalShippingIcon className="text-success me-1" /> */}
                        {/* <div className="fs16">Delivery</div> */}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-5 pb-3 d-flex align-items-center justify-content-between">
        <Pagination
          onChange={(e, page) => handlePageChange(e, page)}
          count={10}
          color="secondary"
          defaultPage={1}
        />
        <p className="m0">Showing {orders.length} entries</p>
      </div>
    </>
  );
}
