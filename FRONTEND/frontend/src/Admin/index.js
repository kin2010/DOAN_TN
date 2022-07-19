import React from "react";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CNavItem,
  CNavTitle,
  CNavGroup,
} from "@coreui/react";
import { cilSpeedometer, cilPuzzle, cilHome } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { nullToken } from "../Slice/AuthSlice";
import { removeUserSession } from "../Utils/Common";
import { useUserQuery } from "../app/AuthApi";

const Admin = () => {
  const { data, refetch, error, currentData } = useUserQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [unfoldable, setUfordable] = useState(false);
  const [sidebarShow, setSidebarshow] = useState(true);
  const handleLogout = async () => {
    await dispatch(nullToken());
    removeUserSession();
    refetch();
    navigate("/login");
  };
  return (
    <div>
      <CSidebar
        position="fixed"
        unfoldable={unfoldable}
        visible={true}
        onVisibleChange={(visible) => {
          setSidebarshow(visible);
        }}
      >
        <CSidebarBrand>Administration</CSidebarBrand>
        <CSidebarNav>
          <CNavTitle>Manager</CNavTitle>
          {/* <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilHome} />
            <Link className="text-light" to="/admin/overview" as={Link}>
              Trang chủ
            </Link>
           
          </CNavItem> */}
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
            <Link className="text-light" to="/admin/overview" as={Link}>
              Tổng quan
            </Link>
            {/* <CBadge color="primary ms-auto">NEW</CBadge> */}
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
            <Link className="text-light" to="/admin/product" as={Link}>
              Quản lí sản phẩm
            </Link>
            {/* <CBadge color="primary ms-auto">NEW</CBadge> */}
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
            <Link className="text-light" to="/admin/category" as={Link}>
              Quản lí loại hàng
            </Link>
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
            <Link className="text-light" to="/admin/bill" as={Link}>
              Quản lí đơn hàng
            </Link>
          </CNavItem>

          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
            <Link className="text-light" to="/admin/user" as={Link}>
              Quản lí người dùng
            </Link>
          </CNavItem>
          <CNavItem href="#" onClick={() => handleLogout()}>
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
            <Link className="text-light" to="/admin/user" as={Link}>
              Đăng xuất
            </Link>
          </CNavItem>
          {/* <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
            <Link className="text-light" to="/admin/categories">
              Quản lí shop
            </Link>
          </CNavItem> */}
          {/* <CNavGroup toggler="Nav dropdown">
              <CNavItem href="#">
                <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
                item
              </CNavItem>
              <CNavItem href="#">
                <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
                item
              </CNavItem>
            </CNavGroup> */}
        </CSidebarNav>
        <CSidebarToggler
          className="d-none d-lg-flex"
          onClick={() => setUfordable(!unfoldable)}
        />
      </CSidebar>
    </div>
  );
};

export default Admin;
