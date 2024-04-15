import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CSRFToken = () => {
  const [csrftoken, setcsrftoken] = useState("");

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`https://156.56.103.251:8000/csrf_cookie`, {
          withCredentials: true,
        });
        const token = getCookie("csrftoken");
        setcsrftoken(token);
      } catch (err) {
        console.error("Error fetching CSRF token:", err);
      }
    };

    fetchData();
  }, []);

  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
};

export default CSRFToken;
