import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import { Badge } from "@mui/material";
import CIcon from "@coreui/icons-react";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons";
import BreadCrumb from "./components/Breadcrumb";
import { AuthContext } from "../Context/AuthContext";
// import AppHeaderDropdown from "./AppHeaderDropDown";

// import Noti from "./components/Notification";
const HeaderAdmin = () => {
  //   const dispatch = useDispatch()
  //   const sidebarShow = useSelector((state) => state.sidebarShow)
  const { setBread } = useContext(AuthContext);
  // useEffect(()=>{
  //   set
  // },[])
  const Notification = () => {
    console.log("noti");
  };
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        {/* <Noti /> */}
        <CHeaderToggler
          className="ps-1 "
          // x
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={cilEnvelopeOpen} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink
              to="/admin/overview"
              component={NavLink}
              activeClassName="active"
            >
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/shop" component={NavLink} activeClassName="active">
              Users
            </CNavLink>
          </CNavItem>
          {/* <CNavItem>
						<CNavLink href="#">Settings</CNavLink>
					</CNavItem> */}
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem className="mr-5">
            {/* <CNavLink href="#" as={Button} onClick={() => Notification()}>
							<Badge color="secondary" variant="dot">
								<NotificationsIcon />{" "}
							</Badge>
						</CNavLink> */}
            <Badge
              color="secondary"
              onClick={() => Notification()}
              variant="dot"
              style={{ cursor: "pointer" }}
            >
              {/* <NotificationsIcon />{" "} */}
            </Badge>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">{/* <AppHeaderDropdown /> */}</CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <BreadCrumb></BreadCrumb>
      </CContainer>
    </CHeader>
  );
};

export default HeaderAdmin;
