import { useNavigate } from "react-router-dom";

import "./SetPinModal.scss";
import React from "react";

const SetPinModal = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <p className="paragraph">Secure pin is not set for this account</p>
        <button
          className="pinbutton"
          onClick={() => navigate("/externaluser/accountpin")}
        >
          Set Pin
        </button>
      </div>
    </>
  );
};

export default SetPinModal;
