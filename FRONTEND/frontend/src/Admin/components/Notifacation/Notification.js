import { Alert } from "@mui/material";
import React, { useContext, useEffect } from "react";

import { CategoryContext } from "../../../Context/CategoryContext";
import "./index.scss";
const Notification = () => {
  const {
    showToast: { show, message, color },
    setShowToast,
  } = useContext(CategoryContext);
  const mapColor = (color) => {
    switch (color) {
      case "e": {
        return "error";
      }
      case "s": {
        return "success";
      }
      case "w": {
        return "warning";
      }
      case "i": {
        return "info";
      }
      default:
        return "success";
    }
  };

  return (
    <>
      {show === true && (
        <div className="toast">
          <Alert security={mapColor(color)}>{message}</Alert>
        </div>
      )}
    </>
  );
};

export default Notification;
