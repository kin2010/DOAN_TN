import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { faCashRegister, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { CounterWidget, SalesValueWidget } from "./Widgets";
import Bar, { LineChart } from "./Chart.js";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addDays, subDays, subWeeks, subYears } from "date-fns";
import axiosClient from "../../../app/AxiosClient";
import { apiURL } from "../../../Context/constant";
import { formatNumber, formatTime } from "../../../Utils/func";
import { ChartMonth } from "./ChartMonth";
import Revenue from "./Revenue";
const Overview = () => {
  const [dateValue, setDateValue] = useState(new Date());
  const [user, setUser] = useState([]);
  const [dt, setData] = useState([]);
  const [dtBefore, setDtBefore] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [revenueBefore, setRevenueBefore] = useState(0);
  const [increase, setIncrease] = useState(0);
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date(subYears(new Date(), 1)));
  const [year1, setYear1] = useState([]);
  const [year2, setYear2] = useState([]);
  const handleChange = (newValue) => {
    setDateValue(newValue.toISOString());
  };
  const handleChange1 = (newValue) => {
    setDate1(newValue.toISOString());
  };
  const handleChange2 = (newValue) => {
    setDate2(newValue.toISOString());
  };
  useEffect(() => {
    if (dt.length > 0) {
      const re = dt.reduce((pre, curr) => {
        return pre + (curr?.revenue || 0);
      }, 0);
      const re2 = dtBefore.reduce((pre, curr) => {
        return pre + (curr?.revenue || 0);
      }, 0);
      setRevenue(re);
      setRevenueBefore(re2);
      console.log(re, re2, dt, dtBefore);
      if (re === 0) {
        if (re2 > 0) {
          setIncrease(-100);
        } else {
          setIncrease(0);
        }
        return;
      } else {
        if (re2 === 0) {
          setIncrease(100);
        } else {
          const percentage = (re / re2 - 1) * 100;
          console.log(percentage);
          setIncrease(percentage.toFixed(2));
        }
        return;
      }
    }
  }, [dt, dtBefore]);

  useEffect(() => {
    fetchD(dateValue);
    fetchLastWeek(subDays(new Date(dateValue), 7));
  }, [dateValue]);
  useEffect(() => {
    fetchYear1(date1);
    fetchYear2(date2);
  }, [date1, date2]);

  const fetchYear2 = async (date) => {
    try {
      const params = {
        startTime: new Date(date),
        // startTime: "2022-07-17T00:00:00.000Z",
      };
      // console.log(params);
      const res = await axiosClient.post(`${apiURL}/revenue/year`, params);
      setYear2(res);
      // console.log(dt);
    } catch (error) {}
  };
  const fetchYear1 = async (date) => {
    try {
      const params = {
        startTime: new Date(date),
        // startTime: "2022-07-17T00:00:00.000Z",
      };
      // console.log(params);
      const res = await axiosClient.post(`${apiURL}/revenue/year`, params);
      setYear1(res);
      // console.log(dt);
    } catch (error) {}
  };
  const fetchD = async (date) => {
    try {
      const params = {
        startTime: new Date(date),
        // startTime: "2022-07-17T00:00:00.000Z",
      };
      // console.log(params);
      const res = await axiosClient.post(`${apiURL}/revenue`, params);
      setData(res);
      // console.log(dt);
    } catch (error) {}
  };
  const fetchLastWeek = async (date) => {
    try {
      const params = {
        startTime: new Date(date),
        // startTime: "2022-07-17T00:00:00.000Z",
        //subDays(new Date(date), 1)
      };

      const res = await axiosClient.post(`${apiURL}/revenue`, params);
      setDtBefore(res);
    } catch (error) {}
  };
  useEffect(() => {
    fecthUser();
  }, []);
  const fecthUser = async () => {
    try {
      const res = await axiosClient.get(`${apiURL}/auth/getall`);
      if (res) {
        setUser(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const total = (data) => {
    if (data && data?.length === 0) {
      return 0;
    }
    const rs = data.reduce((pre, curr) => {
      return pre + curr?.revenue;
    }, 0);
    return rs;
  };
  return (
    <>
      <Row>
        <div className="fs21 mb-5"> Doanh thu tu???n :</div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Ch???n ng??y"
              inputFormat="MM/dd/yyyy"
              value={dateValue}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />{" "}
          </LocalizationProvider>
        </div>

        <Col xs={12} className="mb-4 d-none d-sm-block">
          <Container>
            <LineChart date={dt} />
          </Container>
        </Col>
        <div className="fs21 mb-5"> Chi ti???t doanh thu theo tu???n :</div>
        <div className="fs20 fw500 mb-5">
          T???ng :{" "}
          <span className="text-success fw700">{formatNumber(total(dt))}</span>{" "}
          vn??
        </div>
        <div>
          {dt.length > 0 &&
            dt.map((d, index) => (
              <div
                // style={{ width: "fit-content" }}
                className="bg-white shadow2 ps-3 py-3 mb-3"
                key={index}
              >
                <Revenue
                  date={d?.date}
                  dateEnd={d?.dateEnd}
                  revenue={d?.revenue}
                  order={d?.order}
                />
              </div>
            ))}
        </div>
        <Col xs={12} sm={6} xl={6} md={6} className="mb-4">
          <CounterWidget
            category="Revenue"
            title={`${formatNumber(revenue)} vn??  `}
            period={`${formatTime(dateValue, "DD/MM/YYYY")} - ${formatTime(
              addDays(new Date(dateValue), 7),
              "DD/MM/YYYY"
            )}`}
            percentage={increase}
            icon={faCashRegister}
            iconColor="shape-tertiary"
            last={`${formatNumber(revenueBefore)} vn??  `}
            time="week"
          />
        </Col>
        <Col xs={12} sm={6} xl={6} md={6} className="mb-4">
          <CounterWidget
            category="Customers"
            title={`${user?.length} people`}
            period={`${formatTime(dateValue, "DD/MM/YYYY")} - ${formatTime(
              addDays(new Date(dateValue), 7),
              "DD/MM/YYYY"
            )}`}
            // percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>
        <div
          className="mt-3 mb-5 w-100"
          style={{ borderBottom: "1px solid gray" }}
        />
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <Container>
            <div className="fs21 mb-5"> Doanh thu N??m :</div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="mb-5 d-flex align-items-center w-75 justify-content-between">
                  <DesktopDatePicker
                    label="Ch???n n??m"
                    inputFormat="dd/yyyy"
                    value={date2}
                    onChange={handleChange2}
                    renderInput={(params) => <TextField {...params} />}
                  />{" "}
                  <DesktopDatePicker
                    label="Ch???n n??m"
                    inputFormat="dd/yyyy"
                    value={date1}
                    onChange={handleChange1}
                    renderInput={(params) => <TextField {...params} />}
                  />{" "}
                </div>
              </LocalizationProvider>
            </div>
            <ChartMonth
              year1={new Date(date1).getFullYear().toString()}
              year2={new Date(date2).getFullYear().toString()}
              dt1={year1}
              dt2={year2}
            />
          </Container>
        </Col>
        <div className="fs21 mb-5">
          {" "}
          Chi ti???t doanh thu n??m :
          <strong className="text-info fs21">
            {year1 && new Date(date1).getFullYear()}
          </strong>
        </div>
        <div className="fs20 fw500 mb-5">
          T???ng :{" "}
          <span className="text-success fw700">
            {formatNumber(total(year1))}
          </span>{" "}
          vn??
        </div>
        <div>
          {year1.length > 0 &&
            year1.map((d, index) => (
              <div
                // style={{ width: "fit-content" }}
                className="bg-white shadow2 ps-3 py-3 mb-3"
                key={index}
              >
                <Revenue
                  date={d?.date}
                  dateEnd={d?.dateEnd}
                  revenue={d?.revenue}
                  order={d?.order}
                />
              </div>
            ))}
        </div>
      </Row>
    </>
  );
};

export default Overview;
