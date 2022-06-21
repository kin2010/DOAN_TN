import React, { useEffect, useRef, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Container, Row, Col, Navbar, NavDropdown, Nav } from 'react-bootstrap';
import './index.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Dropdown from '../Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getAllSub } from '../../Slice/CategorySlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
  CAvatar,
  CIcon,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import { useUserQuery } from '../../app/AuthApi';
import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { removeUserSession, setToken } from '../../Utils/Common';
import { nullToken } from '../../Slice/AuthSlice';
import Cart from '../Cart';
export const ImgStyle = styled('img')((props) => ({
  maxWidth: '100%',
}));
const Header = ({ className }) => {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const { data, refetch, error } = useUserQuery();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const showDrop = () => {
    setShow(true);
  };
  const carts = useSelector((state) => state.carts.carts);
  const refDropdown = useRef(null);
  const hideDrop = (hide) => {
    setShow(hide);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = await dispatch(getAllCategories());
        const res = unwrapResult(action);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchData2 = async () => {
      try {
        const action = await dispatch(getAllSub());
        const res = unwrapResult(action);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchData2();
  }, []);
  const handleLogout = async () => {
    await dispatch(nullToken());
    removeUserSession();
    refetch();
    navigate('/login');
  };
  return (
    <>
      <header className={className}>
        <Navbar id="header" bg="light" expand="lg">
          <Container id="container">
            {showCart && <Cart show={setShowCart}></Cart>}
            {show && (
              <Dropdown hide={hideDrop} ref={refDropdown}>
                {' '}
              </Dropdown>
            )}
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
              <Row className="align-items-center mb-2">
                <Col>
                  <input
                    placeholder="search ..."
                    className="search-header"
                    type="search"
                  />
                </Col>
                <Col>
                  <Nav className="justify-content-end nav-header">
                    {data && !error ? (
                      <Nav.Link href="#link">
                        Hi{' '}
                        <span style={{ color: '#ff536f' }}>
                          {data?.fullName}
                        </span>
                      </Nav.Link>
                    ) : (
                      <>
                        <Nav.Link as={Link} to="/login">
                          Login
                        </Nav.Link>
                        <Nav.Link as={Link} to="/register">
                          Register
                        </Nav.Link>
                      </>
                    )}

                    {data && !error && (
                      <CDropdown variant="nav-item">
                        <CDropdownToggle
                          placement="bottom-end"
                          className="py-0"
                          caret={false}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src={
                              data.avatar ? data.avatar : '../images/user.png'
                            }
                          />
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0" placement="bottom-end">
                          <CDropdownItem
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleLogout()}
                          >
                            <ExitToAppIcon
                              style={{ transform: 'translate(-6px,6px)' }}
                            />
                            <span as={Link} to="/login">
                              Logout
                            </span>
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    )}

                    <Nav.Link href="#link">
                      <FavoriteIcon color="error" fontSize="large" />
                    </Nav.Link>
                    <div
                      style={{
                        marginTop: 8,
                        cursor: 'pointer',
                        fontSize: '20px',
                      }}
                      onClick={() => setShowCart(!showCart)}
                      className=" nav-icon position-relative text-decoration-none button-cart"
                    >
                      <i
                        className="fa-solid fa-basket-shopping text-success"
                        style={{ fontSize: '35px' }}
                      ></i>{' '}
                      {carts.length > 0 && (
                        <span className="text-danger position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light ">
                          {carts?.length}
                        </span>
                      )}
                    </div>
                  </Nav>
                </Col>
              </Row>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto justify-content-between w-75">
                  <Nav.Link as={Link} to={'/'}>
                    Home
                  </Nav.Link>
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
            {/* {show && (
              <Dropdown hide={hideDrop} ref={refDropdown}>
                {' '}
              </Dropdown>
            )} */}
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
