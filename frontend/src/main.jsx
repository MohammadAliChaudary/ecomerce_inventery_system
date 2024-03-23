import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ErrorProvider } from "./context/errorProvider.jsx";
import { AuthProvider } from "./context/authProvider.jsx";
import { SuccessProvider } from "./context/successMessageProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <SuccessProvider>
      <AuthProvider>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </AuthProvider>
    </SuccessProvider>
  </BrowserRouter>
  /* </React.StrictMode> */
);
