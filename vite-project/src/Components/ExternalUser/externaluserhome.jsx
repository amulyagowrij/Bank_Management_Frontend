import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "../Dashboard/dashboard";

export default function ExternalUser() {
  return (
    <>
      <Dashboard role="externaluser" />
    </>
  );
}
