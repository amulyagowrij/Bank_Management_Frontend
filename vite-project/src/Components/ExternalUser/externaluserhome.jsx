import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "../Dashboard/dashboard";
import "./externaluserhome.css";
import Cookies from "js-cookie";

let firstload = true;
let VIEW_PROFILE_URL = "http://localhost:8000/viewuserprofiles";

export default function ExternalUser() {
  const [user_data, setUserData] = useState({
    userName: "",
    accountNumber: "",
    balance: "",
  });

  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/session-user-details`, {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       console.log("Response", response.data);
  //     });
  // }, []);

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
        const user = response.data.profile;
        setUserData({
          userName: user.name,
          accountNumber: user.account.account_number,
          balance: user.account.balance,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditProfile = () => {
    navigate("/externaluser/editprofile");
  };

  return (
    <>
      <Dashboard role="externaluser" />
      <div className="bank-page">
        <main className="bank-content">
          <section className="user-info">
            <h1>Hi, {user_data.userName}</h1>
            <p>Account Number: {user_data.accountNumber}</p>
            <p>Balance: ${user_data.balance}</p>
            <button className="edit_profile" onClick={handleEditProfile}>
              Edit Profile
            </button>
          </section>
        </main>
      </div>
    </>
  );
}
