import React, { useEffect, useState } from "react";
import axios from "axios";
import "./internaluserviewuserprofiles.scss";
import Dashboard from "../Dashboard/dashboard";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// let VIEW_ALL_PROFILE_URL = "http://localhost:8000/viewalluserprofiles";
let VIEW_ALL_PROFILE_URL = "https://156.56.103.251:8000/viewalluserprofiles";

// let DELETE_ACCOUNT_URL = "http://localhost:8000/internaluser/deleteaccount";
let DELETE_ACCOUNT_URL =
  "https://156.56.103.251:8000/internaluser/deleteaccount";

// let VIEW_PROFILE_URL = "http://localhost:8000/viewuserprofiles";
let VIEW_PROFILE_URL = "https://156.56.103.251:8000/viewuserprofiles";

// let ISAUTHENTICATED = "http://localhost:8000/authenticated";
let ISAUTHENTICATED = "https://156.56.103.251:8000/authenticated";

let isAuthenticated = false;
let firstload = true;

const InternalUserViewUserProfiles = () => {
  const [user_data, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const navigate = useNavigate();

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
        if (user.user_role != "System Admin") {
          alert("You dont have permission to view this page");
          navigate("/internaluser");
        }
        setUserData({
          user_role: user.user_role,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
        const response = await axios.get(VIEW_ALL_PROFILE_URL, config);
        let users = response.data.profile;
        users = users.filter((user) => user.user_type === "External");
        setUserData(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const viewRecord = (user_id) => {
    const user = user_data.find((user) => user.id === user_id);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const deleteRecord = async (user_id) => {
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    try {
      const response = await axios.delete(
        `${DELETE_ACCOUNT_URL}/${user_id}`,
        config
      );
      console.log(response);
      if (response.status === 204) {
        alert("Account deleted successfully");
        setUserData((prevUserData) =>
          prevUserData.filter((account) => account.id !== user_id)
        );
      }
    } catch (error) {
      console.error("There was an error deleting the account!", error);
    }
  };

  return (
    <>
      <Dashboard role="internaluser" />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Account Number</th>
              <th>Email Id</th>
              <th>Created Date</th>
              <th>View Details</th>
              <th>Delete account</th>
            </tr>
          </thead>
          <tbody>
            {user_data.map((account, index) => (
              <tr key={account.id}>
                <td>{account.user_name}</td>
                <td>{account.account?.account_number}</td>
                <td>{account.email}</td>
                <td>{account.created_at}</td>
                <td>
                  <button
                    id="view_profile"
                    className="view_profile"
                    onClick={() => viewRecord(account.id)}
                  >
                    View Profile
                  </button>
                </td>
                <td>
                  <button
                    id="delete"
                    className="delete"
                    onClick={() => deleteRecord(account.id)}
                  >
                    Delete Account
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div>
          <div className="overlay"></div>
          <div className="modal">
            <button className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <p>User Name: {selectedUser.user_name}</p>
            <p>Account Number: {selectedUser.account?.account_number}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default InternalUserViewUserProfiles;
