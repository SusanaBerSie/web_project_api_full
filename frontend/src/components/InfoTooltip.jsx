import React from "react";
import "../blocks/InfoTooltip.css";

export default function InfoTooltip({ message, logo, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className="popup__overlay" onClick={handleOverlayClick}></div>
      <div className="toolTip">
        <button
          className="popup__X-button"
          aria-label="Close modal"
          type="button"
          onClick={onClose}
        >
          X
        </button>
        <div className="toolTip__container">
          <img
            src={logo}
            className="toolTip__success-logo"
            alt={message.includes("correcto" ? "Éxito" : "Error")}
          ></img>
          <p className="toolTip__success-letter">{message}</p>
        </div>
      </div>
    </>
  );
}
