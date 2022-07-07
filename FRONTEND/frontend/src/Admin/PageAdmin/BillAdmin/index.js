import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { formatNumber } from "../../../Utils/func";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { CategoryContext } from "../../../Context/CategoryContext";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
export const ORDER_STATUS = {
  pending: "#81ab00",
  shipping: "blue",
  DONE: "#43cf20",
  OVER: "red",
  PAID: "#b420cf",
};

export const mapStatus = (status) => {
  return (
    <p style={{ color: ORDER_STATUS[status], fontSize: "20px" }}>{status}</p>
  );
};
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const { setPageOrder } = React.useContext(CategoryContext);
  const orders = useSelector((state) => state.orders.orders);
  const navigate = useNavigate();
  const handlePageChange = (e, page) => {
    setPageOrder(page);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Customer</TableCell>
              <TableCell align="right">Delivery Address</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 && (
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
            {!!orders &&
              Object.values(orders).map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className="hover"
                    onClick={() => navigate(`/order/${row?._id}`)}
                  >
                    {row?._id.toString().slice(-5)}
                  </TableCell>
                  <TableCell align="right">{row?.user?.fullName}</TableCell>
                  <TableCell align="right">
                    {row?.deliveryAddress || "_______"}
                  </TableCell>
                  <TableCell align="right">
                    {`${formatNumber(row?.totalPrice)} đ`}
                  </TableCell>
                  <TableCell align="right">{mapStatus(row?.status)}</TableCell>
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
