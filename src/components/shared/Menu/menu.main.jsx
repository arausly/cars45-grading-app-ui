import React, { useState } from "react";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import { NavLink as RRNavLink, withRouter } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

//custom utils
import {
  isAuthenticated,
  isAdminAuthenticated
} from "../../../config/token.config";
import { removeItem } from "../../../handlers/storage.handler";

const CenterMenu = ({ history }) => {
  const [collapse, setCollapse] = useState(true);
  return (
    <div className="navbarContainer">
      <Navbar light expand="md container">
        <NavbarToggler
          onClick={() => setCollapse(collapse => !collapse)}
          className="mr-2"
        />
        <Collapse isOpen={!collapse} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/dashboard"
                activeClassName="active"
                className="text-white"
              >
                IntelliBuy
              </NavLink>
            </NavItem>
          </Nav>
          <ul className="navbar-nav">
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/gradelist"
                activeClassName="active"
                className="text-white"
              >
                GradeList
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/preview"
                activeClassName="active"
                className="text-white"
              >
                Preview
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar className="my-2 my-lg-0">
              <DropdownToggle nav caret className="text-white">
                Account
              </DropdownToggle>
              <DropdownMenu right className="cars45-menu-dropdown">
                <DropdownItem>
                  <NavItem>
                    <span>
                      <FaRegUserCircle />
                    </span>
                    <span className="navbar-text">
                      {isAuthenticated().email}
                    </span>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                  <NavItem
                    onClick={() => {
                      removeItem("centerToken");
                      history.push("/login");
                    }}
                  >
                    <span>Logout</span>
                  </NavItem>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ul>
        </Collapse>
      </Navbar>
    </div>
  );
};

const AdminMenu = ({ history }) => {
  const [collapse, setCollapse] = useState(true);
  return (
    <div className="navbarContainer">
      <Navbar light expand="md container">
        <NavbarToggler
          onClick={() => setCollapse(collapse => !collapse)}
          className="mr-2"
        />
        <Collapse isOpen={!collapse} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/admin/dashboard"
                activeClassName="active"
                className="text-white"
              >
                Valuations
              </NavLink>
            </NavItem>
          </Nav>
          <ul className="navbar-nav">
            <UncontrolledDropdown nav inNavbar className="my-2 my-lg-0">
              <DropdownToggle nav caret className="text-white">
                Account
              </DropdownToggle>
              <DropdownMenu right className="cars45-menu-dropdown">
                <DropdownItem>
                  <NavItem>
                    <span>
                      <FaRegUserCircle />
                    </span>
                    <span className="navbar-text">
                      {isAdminAuthenticated().email}
                    </span>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                  <NavItem
                    onClick={() => {
                      removeItem("adminToken");
                      history.push("/admin/login");
                    }}
                  >
                    <span>Logout</span>
                  </NavItem>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ul>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default {
  AdminMenu: withRouter(AdminMenu),
  CenterMenu: withRouter(CenterMenu)
};
