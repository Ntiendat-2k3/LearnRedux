/**
 * Điểm vào ứng dụng React.
 * - Bọc <App/> bởi <Provider> để cung cấp Redux store cho toàn bộ cây component.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
