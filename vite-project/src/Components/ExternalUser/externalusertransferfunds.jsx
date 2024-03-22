import "./externalusertransferfunds.scss";
import { useEffect, useState } from "react";
import Dashboard from "../Dashboard/dashboard";
import Modal from "../Modal/Modal";
import axios from "axios";

const ExternalUserTransferFunds = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const user = JSON.parse(sessionStorage.getItem("userid"));

  console.log(user);
  const transferFunds = (event) => {
    event.preventDefault();
    let amount = event.target.amount.value;
    let sourceAccount = event.target.sourceAccount.value;
    let destinationAccount = event.target.destinationAccount.value;
    setFormData({
      amount: amount,
      from_account: sourceAccount,
      to_account: destinationAccount,
      from_user: user,
    });
    setIsModalOpen(true);
  };

  const handleTransferFunds = (formdata) => {
    setIsModalOpen(false);
    console.log(formdata);
    axios({
      method: "post",
      url: "http://localhost:8000/externaluser/transferfunds",
      data: formdata,
    }).then(
      (response) => {
        console.log(response.data);
        if (response.status === 200) {
          alert(`Funds transferred successfully`);
          setFormData({});
        } else if (response.status === 400) {
          console.log(response.data);
          alert(`Funds transfer failed`);
        }
      },
      (error) => {
        console.log(error.response.data);
        if (error.response.data["from_account_id"]) {
          alert(`Funds transfer failed. Check Source account number`);
        } else if (error.response.data["to_account_id"]) {
          alert(`Funds transfer failed. Check Destination account number`);
        } else if (error.response.data["amount"]) {
          alert(`Funds transfer failed. Check amount`);
        } else if (error.response.data["message"]) {
          alert(`${error.response.data["message"]}`);
        }
      }
    );
  };

  return (
    <>
      <Dashboard role="externaluser" />
      <div className="transferfunds">
        <h1>Transfer Funds</h1>
        <form
          action=""
          className="transferfund_container"
          method="post"
          onSubmit={transferFunds}
        >
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" name="amount" />
          <label htmlFor="sourceAccount">Source Account</label>
          <input type="text" id="sourceAccount" name="sourceAccount" />
          <label htmlFor="destinationAccount">Destination Account</label>
          <input
            type="text"
            id="destinationAccount"
            name="destinationAccount"
          />
          <button type="submit">Transfer</button>
        </form>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleTransferFunds}
          formData={formData}
        ></Modal>
      </div>
    </>
  );
};

export default ExternalUserTransferFunds;
