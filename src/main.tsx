import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./redux/store";
import "./services/i18next";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={setupStore()}>
        <React.Suspense>
          <App />
        </React.Suspense>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
