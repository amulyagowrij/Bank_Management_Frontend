import "./externalusertransferfunds.scss";
import Dashboard from "../Dashboard/dashboard";

const ExternalUserTransferFunds = () => {
  return (
    <>
      <Dashboard role="externaluser" />
      <div className="transferfunds">
        <h1>Transfer Funds</h1>
        <form action="" className="transferfund_container">
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" name="amount" />
          <label htmlFor="destinationAccount">Destination Account</label>
          <input
            type="text"
            id="destinationAccount"
            name="destinationAccount"
          />
          <button type="submit">Transfer</button>
        </form>
      </div>
    </>
  );
};

export default ExternalUserTransferFunds;
