import "./externalusertransactionhistory.scss";
import Dashboard from "../Dashboard/dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// let ISAUTHENTICATED = "http://localhost:8000/authenticated";
let ISAUTHENTICATED = "https://156.56.103.251:8000/authenticated";

let isAuthenticated = false;
let firstload = true;

const ExternalUserTransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

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
        const response = await axios.get(
          "https://156.56.103.251:8000/externaluser/transactionhistory",
          config
        );
        setTransactions(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    // axios
    //   .get("http://localhost:8000/externaluser/transactionhistory", {
    //     params: {
    //       user: user_id,
    //       isSystemAdmin: false,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setTransactions(response.data);
    //   });
  }, []);
  return (
    <>
      <Dashboard role="externaluser" />
      <div className="transaction-container">
        <section className="transaction-history">
          <h2>Transaction History</h2>
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
                <th>Source Account</th>
                <th>Destination Account</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.transaction_id}>
                  <td>{transaction.transaction_id}</td>
                  <td>${transaction.amount}</td>
                  <td
                    className={
                      transaction.transaction_type === "credited"
                        ? "credit"
                        : transaction.transaction_type === "debited"
                        ? "debit"
                        : "transfer"
                    }
                  >
                    <span>
                      {transaction.transaction_type[0]?.toUpperCase() +
                        transaction.transaction_type.slice(1)}
                    </span>
                  </td>
                  <td>{transaction.created_at}</td>
                  <td>{transaction.from_account_number}</td>
                  <td>{transaction.to_account_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default ExternalUserTransactionHistory;
