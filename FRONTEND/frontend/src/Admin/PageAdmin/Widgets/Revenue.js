import React from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { formatNumber, formatTime } from "../../../Utils/func";
const Revenue = ({ date, dateEnd, revenue, order }) => {
  return (
    <div className=" w-50 d-flex align-items-center ">
      <ArrowCircleUpIcon
        className=" fw700 text-success me-4 cssicon"
        fontSize="ok"
      />
      <div className="d-flex flex-column fw500" style={{ marginRight: "auto" }}>
        <div>{`From ${formatTime(date, "DD/MM/YYYY")}      to     ${formatTime(
          dateEnd,
          "DD/MM/YYYY"
        )}`}</div>
        <div>
          {order && (
            <span className="text-success fw400">
              <strong>{order?.length || 0}</strong> đơn hàng
            </span>
          )}
        </div>
      </div>
      <div className="fs21 fw700 text-success">
        + {formatNumber(revenue)} vnđ
      </div>
    </div>
  );
};

export default Revenue;
