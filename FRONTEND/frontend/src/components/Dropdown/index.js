import { List, ListItem, ListItemText } from '@mui/material';
import React, { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavDropdown, Row, Col } from 'react-bootstrap';
import './index.scss';
const Dropdown = forwardRef(({ hide }, ref) => {
  const [show, setShow] = useState(false);
  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };
  console.log(ref);
  const hideDrop = () => {
    hide(false);
  };
  return (
    <>
      <div onMouseLeave={hideDrop} ref={ref} className="dropdownHeader">
        <Row>
          <Col md={4} className="border-right">
            <List>
              <ListItem>
                <ListItemText
                  primary={<Link to="/chamsoc">Chăm sóc da</Link>}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Trang điểm" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Dưỡng thể" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Chăm sóc tóc" />
              </ListItem>
            </List>
          </Col>
          <Col md={8} className="dropdown-content">
            <Row>
              <Col md={4}>
                <ListItem>
                  <ListItemText
                    primary={<Link to="/chamsoc">Chăm sóc da</Link>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={<Link to="/chamsoc">Chăm sóc da</Link>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={<Link to="/chamsoc">Chăm sóc da</Link>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={<Link to="/chamsoc">Chăm sóc da</Link>}
                  />
                </ListItem>
              </Col>
              <Col md={4}>
                <ListItem>
                  <ListItemText
                    primary={<Link to="/chamsoc">Chăm sóc da</Link>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={<Link to="/chamsoc">Chăm sóc da</Link>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={<Link to="/chamsoc">Chăm sóc da</Link>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={<Link to="/chamsoc">Chăm sóc da</Link>}
                  />
                </ListItem>
              </Col>
              <Col md={4}>
                <ListItem>
                  <ListItemText
                    primary={<Link to="/chamsoc">Chăm sóc da</Link>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={<Link to="/chamsoc">Chăm sóc da</Link>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={<Link to="/chamsoc">Chăm sóc da</Link>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={<Link to="/chamsoc">Chăm sóc da</Link>}
                  />
                </ListItem>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
});

export default Dropdown;
