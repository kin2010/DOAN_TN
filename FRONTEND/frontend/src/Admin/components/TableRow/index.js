import React from "react";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.scss";
const TbRow = (props) => {
  const {
    _id,
    id,
    name,
    avatar,
    trademark,
    description,
    subCategory,
    stock,
    price,
    sell,
  } = props;
  return (
    <>
      {" "}
      <tr>
        <td>
          <Link to={`/product/${_id}`}>{_id.toString().slice(-5)}</Link>
        </td>
        <td>
          <img className="img_pd" src={avatar} alt="pd" />
        </td>
        <td>
          <p
            className="limit"
            style={{
              fontSize: "13px",
              textAlign: "start",
            }}
          >
            {name}
          </p>
        </td>
        <td>
          <p>{trademark?.name || ""}</p>
        </td>

        <td>
          <p>{price}</p>
        </td>
        <td>
          <p>{sell || 0}</p>
        </td>
        <td>
          {" "}
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <i className="icon-dark fas fa-ellipsis-h-alt"></i>
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item>
                      <i className="me-2 far fa-eye"></i> View Details
                  </Dropdown.Item> */}
              <Dropdown.Item to={`/admin/product/${_id}`} as={Link}>
                <i className="me-2 fas fa-edit"></i> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <i className="me-2 fas fa-trash"></i> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </>
  );
};

export default TbRow;
