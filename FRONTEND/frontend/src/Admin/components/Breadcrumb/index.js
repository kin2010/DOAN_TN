import React, { useContext } from "react";
import { Breadcrumb } from "react-bootstrap";
import { AuthContext } from "../../../Context/AuthContext";
const BreadCrumb = () => {
  const { bread } = useContext(AuthContext);
  return (
    <>
      <Breadcrumb
        className="d-none d-md-inline-block"
        listProps={{
          className: "breadcrumb-dark breadcrumb-transparent",
        }}
      >
        <Breadcrumb.Item>
          <i className="fas fa-home"></i>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item active>{bread}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
};

export default BreadCrumb;
