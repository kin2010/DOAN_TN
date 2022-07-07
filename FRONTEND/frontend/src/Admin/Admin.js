import React from "react";

import { Outlet } from "react-router-dom";
import Admin from "../Admin";
import HeaderAdmin from "./HeaderAdmin";
const AdminLayout = () => {
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
