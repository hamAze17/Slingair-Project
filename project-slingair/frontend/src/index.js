import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ContextProvider } from "./components/ContextFlights";
ReactDOM.render(
  <ContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContextProvider>,
  document.getElementById("root")
);
