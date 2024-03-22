import "./externalusereditprofile.scss";
import Dashboard from "../Dashboard/dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let UPDATE_URL = "http://localhost:8000/externaluser/updateprofile";
let VIEW_PROFILE_URL = "http://localhost:8000/viewuserprofiles";

const ExternalUserEditProfile = () => {
  const [user_data, setUserData] = useState({
    userName: "",
    user_userName: "",
    userEmail: "",
  });
  const [userPassword, setUserPassword] = useState("");
  const user_id = JSON.parse(sessionStorage.getItem("userid"));

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(VIEW_PROFILE_URL);
        const user = response.data.filter((user) => user.user_id === user_id);
        console.log(user[0]);
        setUserData({
          userName: user[0].name,
          user_userName: user[0].user_name,
          userEmail: user[0].email,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDetails = {
        password: userPassword,
      };

      const response = await axios.put(`${UPDATE_URL}/${user_id}`, userDetails);

      console.log(response.data);
      alert("Profile updated successfully!");
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
