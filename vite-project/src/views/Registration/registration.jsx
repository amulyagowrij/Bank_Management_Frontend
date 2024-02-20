import "./registration.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Registration = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userType, setUserType] = useState("");
  const [roleType, setRoleType] = useState("");

  const navigate = useNavigate();

  const secondDropdownOptions = {
    Internal: ["System Admin", "System Manager", "Employee"],
    External: ["Customer", "Merchant/Organisation"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(userType, roleType, userName, userPassword);
  };

  const handleClick = () => {
    navigate("/registration");
  };

  return (
    <>
      <div className="box-container">
        <div className="registration-container">
          <h1>Register a User</h1>
          <form className="input-container" onSubmit={handleSubmit}>
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
                value={userName}
                className="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <input
                value={userEmail}
                className="emailaddress"
                type="email"
                placeholder="Enter your Email"
                onChange={(e) => setUserEmail(e.target.value)}
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
            <div>
              <input
                value={confirmPassword}
                className="confirm-password"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="primary-button" onClick={handleClick}>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
