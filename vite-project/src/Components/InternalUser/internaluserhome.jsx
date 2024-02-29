import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "../Dashboard/dashboard";
import "./internaluserhome.css";

export default function InternalUser() {
  const userInfo = {
    name: "Motu Patlu",
    accountNumber: "131019",
    email: "motu.patlu@example.com",
    address: "Furfuri Nagar, Furfuri Chawl, Plot No. 1",
    phone: "9999900000",
    balance: 10110.0,
    branch: "Bhind",
    transactions: [
      {
        id: 31,
        amount: 200.0,
        type: "Credited",
        date: "2023-07-25",
        sourceAccount: "116797",
      },
      {
        id: 31,
        amount: 200.0,
        type: "Credited",
        date: "2023-07-25",
        sourceAccount: "116797",
      },
    ],
  };

  return (
    <>
      <Dashboard role="externaluser" />
      <div className="bank-page">
        <main className="bank-content">
          <section className="user-info">
            <h1>Hi, {userInfo.name}</h1>
            <p>Account Number: {userInfo.accountNumber}</p>
            <p>Balance: ${userInfo.balance.toFixed(2)}</p>
          </section>
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
                </tr>
              </thead>
              <tbody>
                {userInfo.transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>${transaction.amount}</td>
                    <td className="type">{transaction.type}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.sourceAccount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </>
  );
}
