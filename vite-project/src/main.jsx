import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root/root.jsx";
import Registration from "./Components/Registration/registration.jsx";
import ExternalUser from "./Components/ExternalUser/externaluserhome.jsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
