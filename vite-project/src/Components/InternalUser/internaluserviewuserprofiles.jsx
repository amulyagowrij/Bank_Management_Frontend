import React, { useEffect, useState } from "react";
import axios from "axios";
import "./internaluserviewuserprofiles.scss";
import Dashboard from "../Dashboard/dashboard";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const VIEW_PROFILE_URL = "http://localhost:8000/viewalluserprofiles";
const DELETE_ACCOUNT_URL = "http://localhost:8000/internaluser/deleteaccount";
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
        console.log(response.data);
        setUserData(response.data.profile);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   if (firstload) {
  //     firstload = false;
  //     if (sessionStorage.getItem("name") === null) {
  //       alert("You need to log in to access this page");
  //       sessionStorage.clear();
  //       navigate("../");
  //     }
  //   }
  // }, []);

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
  //   console.log("Deleting record with user_id:", user_id);
  //   axios
  //     .delete(`${DELETE_ACCOUNT_URL}/${user_id}`)
  //     .then((response) => {
  //       if (response.status === 204) {
  //         alert("Account deleted successfully");
  //         setUserData((prevUserData) =>
  //           prevUserData.filter((account) => account.user_id !== user_id)
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("There was an error deleting the account!", error);
  //     });
  // };

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
