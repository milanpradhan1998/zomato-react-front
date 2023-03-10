import React from "react";
import ReactDOM from "react-dom/client";
import "./css/main.css";
import "./css/responsive.css";
import "./css/searchresult.css";
import "./css/restaurant.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
