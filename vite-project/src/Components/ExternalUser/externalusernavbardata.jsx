import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const ExternalUserNavbarData = [
  {
    title: "Home",
    path: "/externaluser",
    icon: <AiIcons.AiFillHome />,
    class: "nav-text",
  },
  {
    title: "Transfer Funds",
    path: "/externaluser/transferfunds",
    icon: <AiIcons.AiOutlineTransaction />,
    class: "nav-text",
  },
  {
    title: "Transaction History",
    path: "/externaluser/transactionhistory",
    icon: <AiIcons.AiFillHome />,
    class: "nav-text",
  },
];
