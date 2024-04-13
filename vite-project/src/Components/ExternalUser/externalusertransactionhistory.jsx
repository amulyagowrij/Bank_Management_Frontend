import "./externalusertransactionhistory.scss";
import Dashboard from "../Dashboard/dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ExternalUserTransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
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
      console.log("Config", config);
      try {
        const response = await axios.get(
          "http://localhost:8000/externaluser/transactionhistory",
          config
        );
        console.log(response.data);
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
