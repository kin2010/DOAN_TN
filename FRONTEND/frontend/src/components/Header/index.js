import React, { useRef, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Container, Row, Col, Navbar, NavDropdown, Nav } from 'react-bootstrap';
import './index.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Dropdown from '../Dropdown';
const Header = () => {
  const [show, setShow] = useState(false);
  const showDrop = () => {
    setShow(true);
  };
  const refDropdown = useRef(null);
  const hideDrop = (hide) => {
    // console.log(e.target, refDropdown);
    // setShow(false);
    setShow(hide);
  };
  return (
    <>
      <header>
        <Navbar id="header" bg="light" expand="lg">
          <Container id="container">
            <Col md={3}>
              <Navbar.Brand href="#home">
                <img
                  className="img-header"
                  src="../images/logo2.png"
                  alt="nofile"
                />
              </Navbar.Brand>
            </Col>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Col md={9}>
              <Row className="align-items-center mb-5">
                <Col>
                  <input
                    placeholder="search ..."
                    className="search-header"
                    type="search"
                  />
                </Col>
                <Col>
                  <Nav className="justify-content-end nav-header">
                    <Nav.Link href="#home">Login</Nav.Link>
                    <Nav.Link href="#link">Register</Nav.Link>
                    <Nav.Link href="#link">
                      <FavoriteIcon color="error" fontSize="large" />
                    </Nav.Link>
                    <div
                      style={{ marginTop: 8 }}
                      className="nav-icon position-relative text-decoration-none button-cart"
                    >
                      <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1" />
                      <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                        2
                      </span>
                      <div className="shopping-cart-content ">
                        <div
                          style={{ width: 'fit-content', marginLeft: 25 }}
                          className="ml-1 bg-info rounded-circle px-2 py-1 mt-2 text-white "
                        >
                          {/* <i className="fas fa-chevron-up"></i> */}
                        </div>
                      </div>
                    </div>
                  </Nav>
                </Col>
              </Row>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto justify-content-between w-75">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link onMouseEnter={showDrop} href="#home">
                    Product
                    <KeyboardArrowDownIcon />
                  </Nav.Link>

                  {/* <Dropdown></Dropdown>
                  <Dropdown></Dropdown> */}
                  <Nav.Link
                    onMouseEnter={showDrop}
                    onMouseLeave={hideDrop}
                    href="#link"
                  >
                    TradeMark <KeyboardArrowDownIcon />
                  </Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Col>
            {show && (
              <Dropdown hide={hideDrop} ref={refDropdown}>
                {' '}
              </Dropdown>
            )}
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
