import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axiosClient from "../../../app/AxiosClient";
import { apiURL } from "../../../Context/constant";
import { formatDate } from "../../../Utils/func";
import "./index.scss";
const User = () => {
  const [page, setPage] = useState(1);
  const [users, setUser] = useState([]);
  useEffect(() => {
    fecthUser();
  }, [page]);
  const fecthUser = async () => {
    try {
      const params = {
        limit: 10,
        skip: 10 * (page - 1),
      };
      const res = await axiosClient.get(`${apiURL}/auth/getall`, params);
      if (res) {
        setUser(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>AUTHOR</th>
            <th>FUNCTION</th>
            <th>STATUS</th>
            <th>JOIN</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {!!users &&
            Object.values(users).map((user, index) => (
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      className="img-user"
                      src={user?.avatar || "../images/user.png"}
                      alt="no"
                    />
                    <div className="d-flex flex-column align-items-start">
                      <p className="name">{user?.fullName}</p>
                      <p className="email">{user?.email}</p>
                    </div>
                  </div>
                </td>
                <td>{user?.role?.roleName}</td>
                <td>{"Office"}</td>
                <td>{formatDate(user?.createdAt) || "zzz"}</td>
                <td>
                  {" "}
                  <Button onClick={() => {}}>
                    <i className="me-2 fas fa-edit"></i>
                  </Button>
                </td>
              </tr>
            ))}
          {users.length === 0 && (
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
        </tbody>
      </Table>
    </div>
  );
};

export default User;
