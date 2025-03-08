import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AppRouter />
  </Router>
);
