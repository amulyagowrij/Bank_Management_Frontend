import { useNavigate } from "react-router-dom";
import "./root.scss";
import { useState } from "react";
const Root = () => {
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");

  // State for the second dropdown (if needed)
  const [roleType, setRoleType] = useState("");

  const navigate = useNavigate();
  // Options for the second dropdown based on the first selection
  const secondDropdownOptions = {
    Internal: ["System Admin", "System Manager", "Employee"],
    External: ["Customer", "Merchant/Organisation"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    const userType = e.target[0].value;
    const roleType = e.target[1].value;
    const username = e.target[2].value;
    const password = e.target[3].value;
    console.log(userType, roleType, username, password);
  };

  const handleClick = () => {
    navigate("/registration");
  };
  return (
    <>
      <div className="box-container">
        <div className="login-container">
          <h1>Login</h1>
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
              <input className="username" type="text" placeholder="Username" />
            </div>
            <div>
              <input
                className="password"
                type="password"
                placeholder="Password"
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
