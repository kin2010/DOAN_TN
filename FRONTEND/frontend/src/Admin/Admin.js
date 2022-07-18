import React from "react";

import { Outlet, useNavigate } from "react-router-dom";
import Admin from "../Admin";
import { useUserQuery } from "../app/AuthApi";
import HeaderAdmin from "./HeaderAdmin";
const AdminLayout = () => {
  const { data } = useUserQuery();
  const navigate = useNavigate();

  if (data) {
    if (data?.role?.roleName === "User") {
      navigate("/");
    }
  }
  return (
    <div>
      <Admin />
      <div
        className="wrapper d-flex flex-column min-vh-100 bg-light"
        style={{ marginLeft: 256 }}
      >
        <HeaderAdmin />
        <div className="body flex-grow-1 px-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
