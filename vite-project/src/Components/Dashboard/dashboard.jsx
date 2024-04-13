import "./dashboard.scss";
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { ExternalUserNavbarData } from "../ExternalUser/externalusernavbardata";
import { InternalUserNavbarData } from "../InternalUser/internalusernavbardata";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const Dashboard = (props) => {
  const [sidebar, setsidebar] = useState(false);
  const navigate = useNavigate();

  let role = props.role;

  const showSideBar = () => {
    setsidebar(!sidebar);
  };

  const logout = async () => {
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const body = JSON.stringify({
      withCredentials: true,
    });

    try {
      const res = await axios.post(
        `http://localhost:8000/logout`,
        body,
        config
      );

      if (res.data.success) {
        navigate("/");
      } else {
        alert("Logout failed");
      }
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSideBar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSideBar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {role === "externaluser"
              ? ExternalUserNavbarData.map((item, index) => {
                  return (
                    <li key={index} className={item.class}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })
              : role === "internaluser"
              ? InternalUserNavbarData.map((item, index) => {
                  return (
                    <li key={index} className={item.class}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })
              : ""}
            <li className="nav-text">
              <Link onClick={logout}>
                <IoIcons.IoIosLogOut />
                <span>Log out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Dashboard;
