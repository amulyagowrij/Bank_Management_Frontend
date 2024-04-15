import "./VerifyEmail.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const VerifyEmail = () => {
  const [inputOtp, setInputOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  const [user, setUser] = useState({
    email: location.state.email,
    name: location.state.name,
    user_name: location.state.username,
    password: location.state.password,
    user_type: location.state.userType,
    user_role: location.state.user_role,
  });
  const onVerifySuccess = async () => {
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    console.log("Config", config);
    let data = user;
    try {
      const response = await axios.post(
        `https://156.56.103.251:8000/registration`,
        data,
        config
      );

      if (response.status === 201) {
        alert(`Registration successful`);
        navigate("/");
      } else {
        alert(
          `Registration failed. There was an error saving the user. Please try again`
        );
      }
    } catch (err) {
      console.log(err);
      alert(
        `Registration failed. There was an error saving the user. Please try again`
      );
    }

    // await axios({
    //   method: "post",
    //   url: "http://localhost:8000/registration",
    //   data: user,
    //   config,
    // }).then(
    //   (response) => {
    //     console.log(response);
    //     if (response.status === 201) {
    //       alert(`Registration successful`);
    //       navigate("/");
    //     } else {
    //       alert(
    //         `Registration failed. There was an error saving the user. Please try again`
    //       );
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //     alert(
    //       `Registration failed. There was an error saving the user. Please try again`
    //     );
    //   }
    // );
  };

  const verifyOtp = async () => {
    await axios
      .post("https://bank-management-backend-five.vercel.app/verify-otp", {
        email: user.email,
        otp: inputOtp,
      })
      .then(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            alert(`Email verification successful`);
            onVerifySuccess();
          } else {
            alert(
              `Email verification failed. There was an error verifying the email. Please try again`
            );
          }
        },
        (error) => {
          console.log(error);
          alert(
            `Email verification failed. There was an error verifying the email. Please try again`
          );
        }
      );
  };
  return (
    <div className="verify-email-container">
      <button
        className="back-button"
        onClick={() => {
          window.history.back();
        }}
      >
        Back
      </button>
      <h1>Verify Email</h1>
      <form
        className="verify-input-container "
        method="post"
        onSubmit={async (e) => {
          e.preventDefault();
          await verifyOtp();
        }}
      >
        <div>
          <input
            className="verification-code"
            type="text"
            placeholder="Enter Verification Code"
            onChange={(e) => setInputOtp(e.target.value)}
          />
        </div>
        <div>
          <button className="verify-email-button" type="submit">
            Verify Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
