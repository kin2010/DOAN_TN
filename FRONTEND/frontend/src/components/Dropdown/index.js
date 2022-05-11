import { List, ListItem, ListItemText } from '@mui/material';
import React, { forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavDropdown, Row, Col } from 'react-bootstrap';
import './index.scss';
import { getAllCategories, showSubCategories } from '../../Slice/CategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
const Dropdown = forwardRef(({ hide }, ref) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories);
  const subs = useSelector((state) => state.category.showSub);
  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };

  const hideDrop = () => {
    hide(false);
  };
  const handleShowSup = (id) => {
    dispatch(showSubCategories(id));
  };
  const tradeMarkLayout = () => {
    <Row>
      <Col md={4} className="border-right">
        <List>
          {categories &&
            categories.map((cate, index) => (
              <ListItem key={index}>
                <ListItemText
                  onMouseEnter={() => handleShowSup(cate?._id)}
                  primary={
                    <Link to={`/category/${cate._id}`}>{cate.name}</Link>
                  }
                />
              </ListItem>
            ))}
        </List>
      </Col>
    </Row>;
  };
  return (
    <>
      <div onMouseLeave={hideDrop} ref={ref} className="dropdownHeader py-2">
        <Row>
          <Col md={4} className="border-right">
            <List>
              {categories &&
                categories.map((cate, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      onMouseEnter={() => handleShowSup(cate?._id)}
                      primary={
                        <Link to={`/category/${cate._id}`}>{cate.name}</Link>
                      }
                    />
                  </ListItem>
                ))}
            </List>
          </Col>
          <Col md={8} className="dropdown-content">
            <Row>
              {subs &&
                subs.map((sub, index) => (
                  <Col md={4} key={index}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Link to={`/subcategory/${sub._id}`}>{sub.name}</Link>
                        }
                      />
                    </ListItem>
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
});

export default Dropdown;
