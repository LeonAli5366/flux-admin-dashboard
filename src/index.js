import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserContex from "./page/ContextApi/UserContex";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContex>
        <App />
      </UserContex>
    </BrowserRouter>
  </React.StrictMode>
);
