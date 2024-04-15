import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const InternalUserNavbarData = [
  {
    title: "Home",
    path: "/internaluser",
    icon: <AiIcons.AiFillHome />,
    class: "nav-text",
  },
  {
    title: "View user profiles",
    path: "/internaluser/viewuserprofiles",
    icon: <AiIcons.AiOutlineTransaction />,
    class: "nav-text",
  },
  {
    title: "Authorize transactions",
    path: "/internaluser/authorizetransactions",
    icon: <AiIcons.AiFillHome />,
    class: "nav-text",
  },
];
