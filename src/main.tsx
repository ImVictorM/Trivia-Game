import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "./redux/store";
import "./services/i18next";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <React.Suspense>
        <App />
      </React.Suspense>
    </Provider>
  </React.StrictMode>
);
