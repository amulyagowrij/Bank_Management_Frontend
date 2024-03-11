import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root/root.jsx";
import Registration from "./Components/Registration/registration.jsx";
import ExternalUser from "./Components/ExternalUser/externaluserhome.jsx";
import ExternalUserTransferFunds from "./Components/ExternalUser/externalusertransferfunds.jsx";
import ExternalUserTransactionHistory from "./Components/ExternalUser/externalusertransactionhistory.jsx";
import InternalUser from "./Components/InternalUser/internaluserhome.jsx";
import InternalUserViewUserProfiles from "./Components/InternalUser/internaluserviewuserprofiles.jsx";
import InternalUserAuthorizeTransactions from "./Components/InternalUser/internaluserauthorizetransactions.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/externaluser",
    element: <ExternalUser />,
  },
  {
    path: "/externaluser/transferfunds",
    element: <ExternalUserTransferFunds />,
  },
  {
    path: "/externaluser/transactionhistory",
    element: <ExternalUserTransactionHistory />,
  },
  {
    path: "/internaluser",
    element: <InternalUser />,
  },
  {
    path: "/internaluser/viewuserprofiles",
    element: <InternalUserViewUserProfiles />,
  },
  {
    path: "/internaluser/authorizetransactions",
    element: <InternalUserAuthorizeTransactions />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
