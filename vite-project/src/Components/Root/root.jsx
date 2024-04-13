import { useNavigate } from "react-router-dom";
import "./root.scss";
import { useState } from "react";
import axios from "axios";
import CSRFToken from "../CSRFToken/CSRFToken";

const Root = () => {
  const [user_userName, setUser_UserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [roleType, setRoleType] = useState("");

  const navigate = useNavigate();
  // Options for the second dropdown based on the first selection
  const secondDropdownOptions = {
    Internal: ["System Admin", "System Manager", "Employee"],
    External: ["Customer", "Merchant/Organisation"],
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // check all fields filled out
    if (
      user_userName === "" ||
      userPassword === "" ||
      userType === "" ||
      roleType === ""
    ) {
      alert("Login failed. Please fill out all fields");
      return;
    }

    // validate login
    navigate("/2fa", {
      state: {
        username: user_userName,
        password: userPassword,
        userType: userType,
        roleType: roleType,
      },
    });
  };

  const handleClick = () => {
    navigate("/registration");
  };
  return (
    <>
      <div className="box-container">
        <div className="login-container">
          <h1>Login</h1>
          <form
            className="input-container"
            onSubmit={handleLoginSubmit}
            method="post"
          >
            <CSRFToken />
            <div>
              <select
                value={userType}
                className="user-dropdown"
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="">Select User Type</option>
                <option value="Internal">Internal</option>
                <option value="External">External</option>
              </select>

              {userType && (
                <select
                  value={roleType}
                  className="role-dropdown"
                  onChange={(e) => setRoleType(e.target.value)}
                >
                  <option value="">Select Option</option>
                  {secondDropdownOptions[userType].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <input
                value={user_userName}
                className="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setUser_UserName(e.target.value)}
              />
            </div>
            <div>
              <input
                value={userPassword}
                className="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <button className="primary-button" type="submit">
              Login
            </button>
            <button className="primary-button" onClick={handleClick}>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Root;
