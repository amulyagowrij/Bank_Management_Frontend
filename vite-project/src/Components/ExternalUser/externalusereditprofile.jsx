import "./externalusereditprofile.scss";
import Dashboard from "../Dashboard/dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CSRFToken from "../CSRFToken/CSRFToken";

let UPDATE_URL = "http://localhost:8000/externaluser/updateprofile";
let VIEW_PROFILE_URL = "http://localhost:8000/viewuserprofiles";
let ISAUTHENTICATED = "http://localhost:8000/authenticated";
let isAuthenticated = false;
let firstload = true;

const ExternalUserEditProfile = () => {
  const [user_data, setUserData] = useState({
    userName: "",
    user_userName: "",
    userEmail: "",
  });
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.get(ISAUTHENTICATED, config);
        if (response.data.error || response.data.isAuthenticated === "error") {
          alert("You need to login to access this page");
          navigate("/");
        } else if (response.data.isAuthenticated === "success") {
          isAuthenticated = true;
        } else {
          alert("Something went wrong");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (firstload) {
      fetchData();
      firstload = false;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };

      try {
        const response = await axios.get(VIEW_PROFILE_URL, config);
        const user = response.data.profile;
        setUserData({
          userName: user.name,
          user_userName: user.user_name,
          userEmail: user.email,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Password validation function
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
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

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };

      if (!validatePassword(userPassword)) {
        alert(
          "Registration failed. Password must contain at least 8 characters, one uppercase letter, one number, and one special character."
        );
        return;
      }

      const userDetails = {
        password: userPassword,
      };

      const response = await axios.put(`${UPDATE_URL}`, userDetails, config);
      alert("Profile updated successfully!");
      navigate("/");
    } catch (error) {
      // Handle error response
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to update profile!");
    }
  };

  return (
    <>
      <Dashboard role="externaluser" />
      <div className="box-container">
        <div className="registration-container">
          <form
            className="input-container"
            onSubmit={handleUpdateUserSubmit}
            method="post"
          >
            <CSRFToken />
            <div>
              <input
                value={user_data.userName}
                className="username"
                type="text"
                placeholder="Name"
                readOnly={true}
                onChange={(e) =>
                  setUserData({
                    ...user_data,
                    userName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                value={user_data.user_userName}
                className="username"
                type="text"
                placeholder="Username"
                readOnly={true}
                onChange={(e) =>
                  setUserData({
                    ...user_data,
                    user_userName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                value={user_data.userEmail}
                className="emailaddress"
                type="email"
                placeholder="Enter your Email"
                readOnly={true}
                onChange={(e) =>
                  setUserData({ ...user_data, userEmail: e.target.value })
                }
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
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ExternalUserEditProfile;
