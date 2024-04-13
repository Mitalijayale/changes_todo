import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SlidebarData } from "./SlidebarData";
import "./Navbar.css";
import img from "../../assets/collegeLogo.jpg";

function Navbar({ auth }) {
  const { isLoggedIn, setIsLoggedIn } = auth;

  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar-custom">
        {isLoggedIn && (
          <Link to="#" className="nav-menu-bars">
            <FaIcons.FaBars className="bars" onClick={showSidebar} />
          </Link>
        )}
        <img src={img} alt="pict-logo" />
        <div className="navbar-content">
          <h4>PICT</h4>
          <p>Committiees</p>
        </div>
        {isLoggedIn && (
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
      {isLoggedIn && (
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SlidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navbar;
