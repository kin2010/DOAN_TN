import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// use Chinese Simplified locale in a specific instance
import dayjs from "dayjs";

export const formatTime = (date, symbol = "DD/MM/YYYY HH:mm") => {
  if (!!date) {
    return dayjs(date).format(symbol);
  }
  return "";
};

export const formatDate = (day) => {
  if (!day) {
    return;
  }
  return "".concat(day.substring(0, 10), " ", day.substring(11, 19));
};
export const formatNumber = (data) => {
  return new Intl.NumberFormat().format(data);
};

export const dateFormat = (date) => {};

// export const functionService = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   return {
//     navigate: () => {
//       return navigate;
//     },
//     dispatch: () => {
//       return dispatch;
//     },
//   };
// };
