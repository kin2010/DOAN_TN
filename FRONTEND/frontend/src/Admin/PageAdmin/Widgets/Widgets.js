import { Card, Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Charts.scss";
import React from "react";
import Chartist from "react-chartist";
import ChartistTooltip from "chartist-plugin-tooltips-updated";
import {
  faAngleDown,
  faAngleUp,
  faChartArea,
  faChartBar,
  faChartLine,
  faFlagUsa,
  faFolderOpen,
  faGlobeEurope,
  faPaperclip,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAngular,
  faBootstrap,
  faReact,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";
export const SalesValueChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [[1, 2, 2, 3, 3, 4, 3]],
  };

  const options = {
    low: 0,
    showArea: true,
    fullWidth: true,
    axisX: {
      position: "end",
      showGrid: true,
    },
    axisY: {
      // On the y-axis start means left and end means right
      showGrid: false,
      showLabel: false,
      labelInterpolationFnc: (value) => `$${value / 1}k`,
    },
  };

  const plugins = [ChartistTooltip()];

  return (
    <Chartist
      data={data}
      options={{ ...options, plugins }}
      type="Line"
      className="ct-series-g ct-double-octave"
    />
  );
};
export const SalesValueWidget = (props) => {
  const { title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card
      className=" shadow-sm"
      style={{ backgroundColor: "rgb(144 223 234 / 1)" }}
    >
      <Card.Header className="d-flex flex-row align-items-center flex-0">
        <div className="d-block">
          <h5 className="fw-normal mb-2">{title}</h5>
          <h3>${value}</h3>
          <small className="fw-bold mt-2">
            <span className="me-2">Yesterday</span>
            <FontAwesomeIcon
              icon={percentageIcon}
              className={`${percentageColor} me-1`}
            />
            <span className={percentageColor}>{percentage}%</span>
          </small>
        </div>
        <div className="d-flex ms-auto">
          <Button variant="secondary" size="sm" className="me-2">
            Month
          </Button>
          <Button variant="primary" size="sm" className="me-3">
            Week
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <SalesValueChart />
      </Card.Body>
    </Card>
  );
};
export const CounterWidget = (props) => {
  const {
    icon,
    iconColor,
    category,
    title,
    period,
    percentage,
    last,
    time = "week",
  } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row
          className="d-block d-xl-flex align-items-center"
          style={{ color: "#4a5073" }}
        >
          <Col
            xl={5}
            className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
          >
            <div
              style={{ color: "#4a5073" }}
              className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0`}
            >
              <FontAwesomeIcon icon={icon} size="lg" />
            </div>
            <div className="d-sm-none">
              <h5>{category}</h5>
              <h3 className="mb-1">{title}</h3>
            </div>
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <div className="d-none d-sm-block" style={{ color: "#4a5073" }}>
              <h5>{category}</h5>
              <h3 className="mb-1">{title}</h3>
            </div>
            <small style={{ color: "#4a5073" }}>
              {period}
              {/* , <FontAwesomeIcon icon={faGlobeEurope} size="xs" />{" "}
              WorldWide */}
            </small>
            <div className="small mt-2" style={{ color: "#4a5073" }}>
              <FontAwesomeIcon
                icon={percentageIcon}
                className={`${percentageColor} me-1`}
              />
              {percentage && (
                <span className={`${percentageColor} fw-bold`}>
                  {percentage}%
                </span>
              )}
              {"    "}
              Since last {time}
              {last && (
                <div className={` fw-bold`}>
                  Last {time}: {last}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// export const CircleChartWidget = (props) => {
//     const { title, data = [] } = props;
//     const series = data.map(d => d.value);

//     return (
//       <Card border="light" className="shadow-sm">
//         <Card.Body>
//           <Row className="d-block d-xl-flex align-items-center">
//             <Col xs={12} xl={5} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0">
//               <CircleChart series={series} />
//             </Col>
//             <Col xs={12} xl={7} className="px-xl-0">
//               <h5 className="mb-3">{title}</h5>

//               {data.map(d => (
//                 <h6 key={`circle-element-${d.id}`} className="fw-normal text-gray">
//                   <FontAwesomeIcon icon={d.icon} className={`icon icon-xs text-${d.color} w-20 me-1`} />
//                   {` ${d.label} `}{`${d.value}%`}
//                 </h6>
//               ))}
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>
//     );
//   };
