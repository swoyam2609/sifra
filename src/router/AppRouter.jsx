import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { lazy } from "react";

const ComingSoon = lazy(() => import("../_root/pages/ComingSoon"));

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ComingSoon />,
      },
    ],
  },
]);

export default AppRouter;
