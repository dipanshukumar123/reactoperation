import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
const Header = () => {
  const nav = useNavigate();
  let color = {
    color: "green",
  };
  let reg = {
    color: "red",
  };

  const Logout = () => {
    localStorage.removeItem("api_token");
    nav("/login");
  };

  // useEffect(() => {});
  const log = localStorage.getItem("api_token");
  return (
    <>
      <div className="nav_div">
        <div className="nav_div" style={{ display: "flex" }}>
          {/* {log ? ( */}
          {/* <div> */}
          <NavLink
            className="nav_home"
            style={({ isActive }) => (isActive ? color : undefined)}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="nav_about"
            style={({ isActive }) => (isActive ? color : undefined)}
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className="nav_contact"
            style={({ isActive }) => (isActive ? color : undefined)}
            to="/contact"
          >
            Contact
          </NavLink>
          <NavLink
            className="nav_name"
            style={({ isActive }) => (isActive ? color : undefined)}
            to="/name/:fname"
          >
            Name
          </NavLink>
          {/* <NavLink className="nav_all" style={ ({isActive }) => isActive  ? color : undefined } to="/all">All</NavLink> */}
          {/* </div> */}

          {/* <div style={mystyle}> */}
          <NavDropdown
            title="Profile"
            id="navbarScrollingDropdown"
            className="nav_login"
            style={mystyle}
          >
            <NavLink
              className="nav_register"
              style={({ isActive }) => (isActive ? reg : undefined)}
              to="/register"
            >
              <NavDropdown.Item href="#action3" style={nav_drop_item}>
                Register
              </NavDropdown.Item>
            </NavLink>
            {!log ? (
              <NavLink
                className="nav_login"
                style={({ isActive }) => (isActive ? color : undefined)}
                to="/login"
              >
                <NavDropdown.Item href="#action4" style={nav_drop_item}>
                  Login
                </NavDropdown.Item>
              </NavLink>
            ) : (
              <NavLink
                // className="nav_login"
                // style={({ isActive }) => (isActive ? color : undefined)}
                to={`/login`} onClick={Logout}
              >
              <NavDropdown.Item
                href="#action5"
                style={nav_drop_item}
              >
                Logout
              </NavDropdown.Item>
              </NavLink>
            )}
          </NavDropdown>
          {/* <NavLink className="nav_login" style={ ({isActive }) => isActive  ? color : undefined } to="/login">Login</NavLink> */}
          {/* <NavLink className="nav_register" style={ ({isActive }) => isActive  ? reg : undefined } to="/register">Register</NavLink> */}
          {/* </div> */}
          {/* )} */}
        </div>
      </div>
    </>
  );
};
const nav_drop_item = {
  backgroundColor: "beige",
  color: "blueviolet",
};
const mystyle = {
  color: "black",
  fontFamily: "Arial",
  backgroundColor: "aquamarine",
  display: "flex",
  alignItems: "center",
  padding: "24px 20px",
};
export default Header;
