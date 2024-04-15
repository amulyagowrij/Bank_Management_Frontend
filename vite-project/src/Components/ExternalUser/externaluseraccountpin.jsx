import React, { useState, useEffect, useRef } from "react";
import "./externaluseraccountpin.scss";
import Dashboard from "../Dashboard/dashboard";
import axios from "axios";
import Cookies from "js-cookie";
import CSRFToken from "../CSRFToken/CSRFToken";
import { useNavigate } from "react-router-dom";

// let UPDATE_URL = "http://localhost:8000/externaluser/setaccountpin";
let UPDATE_URL = "https://156.56.103.251:8000/externaluser/setaccountpin";
// let ISAUTHENTICATED = "http://localhost:8000/authenticated";
let ISAUTHENTICATED = "https://156.56.103.251:8000/authenticated";
let isAuthenticated = false;
let firstload = true;

const ExternalUserAccountPin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const timerId = useRef(null);

  const clearErrorMessageTimeout = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
  };
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
    return clearErrorMessageTimeout;
  }, []);

  const handleSetAccountPinSubmit = async (event) => {
    event.preventDefault();
    clearErrorMessageTimeout();
    // let accountnumber = event.target.accountnumber.value;
    let setpin = event.target.setpin.value;
    let confirmpin = event.target.confirmpin.value;

    if (setpin === "" || confirmpin === "") {
      setErrorMessage("All fields are required");
    } else if (setpin !== confirmpin) {
      setErrorMessage("Pin and Confirm Pin should match");
    } else if (setpin.length !== 6) {
      setErrorMessage("Pin should be 6 digits");
    } else if (confirmpin.length !== 6) {
      setErrorMessage("Confirm Pin should be 6 digits");
    } else if (setpin[0] === "0") {
      setErrorMessage("Pin should not start with 0");
    } else {
      setErrorMessage("");
      const config = {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };

      try {
        const updateDetails = {
          account_pin: setpin,
        };
        const response = await axios.put(
          `${UPDATE_URL}`,
          updateDetails,
          config
        );
        console.log(response);
        if (response.status === 200) {
          alert("Account pin updated successfully!");
          event.target.setpin.value = "";
          event.target.confirmpin.value = "";
        } else if (response.status === 404) {
          alert("Account pin update failed");
        }
      } catch (error) {
        console.error(
          "Error updating account pin:",
          error.response ? error.response.data : error.message
        );
        event.target.setpin.value = "";
        event.target.confirmpin.value = "";
      }

      // Set a new timeout for the error message
      timerId.current = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <>
      <Dashboard role="externaluser" />
      <div className="accountpin">
        <h1>Set Account Pin</h1>
        <form
          className="accountpin_container"
          onSubmit={handleSetAccountPinSubmit}
        >
          <CSRFToken />
          <label htmlFor="setpin">Set Pin</label>
          <input type="password" id="setpin" name="setpin" maxLength={6} />
          <label htmlFor="confirmpin">Confirm Pin</label>
          <input
            type="password"
            id="confirmpin"
            name="confirmpin"
            maxLength={6}
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit">Set Pin</button>
        </form>
      </div>
    </>
  );
};

export default ExternalUserAccountPin;
