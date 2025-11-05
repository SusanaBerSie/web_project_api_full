import React from "react";
import { createRoot } from "react-dom/client";
//import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App.jsx";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

/* export default function Main() {
  const [popup, setPopup] = useState(null);
} */
