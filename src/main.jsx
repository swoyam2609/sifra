import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={AppRouter} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
