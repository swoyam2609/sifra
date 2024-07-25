import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { lazy } from "react";
import { RouterData } from "./RouterData";
import Auth from "../_auth/Auth";
import Error404 from "../_root/pages/Error404";
import PrivateRouter from "./PrivateRouter";
import Feedback from "../_root/pages/Feedback";

const ComingSoon = lazy(() => import("../_root/pages/ComingSoon"));
const Home = lazy(() => import("../_root/pages/Home"));
const Dashboard = lazy(() => import("../_root/pages/Dashboard"));
const Signin = lazy(() => import("../_auth/Layout/Signin"));
const Signup = lazy(() => import("../_auth/Layout/Signup"));
const ForgotPassword = lazy(() => import("../_auth/Layout/ForgotPassword"));
const PrivacyPolicy = lazy(() => import("../_root/pages/PrivacyPolicy"));
const TermsAndCondition = lazy(() =>
  import("../_root/pages/TermsAndCondition")
);
const AcceptTermAndCondition = lazy(() =>
  import("../_root/pages/AcceptTermAndCondition")
);

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: RouterData.home.link,
        element: <Home />,
      },
      {
        path: "/coming-soon",
        element: <ComingSoon />,
      },
      {
        path: RouterData.dashboard,
        element: (
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        ),
      },
      {
        path: RouterData.termsAndCondition,
        element: <TermsAndCondition />,
      },
      {
        path: RouterData.privacyPolicy,
        element: <PrivacyPolicy />,
      },
      {
        path: RouterData.acceptTerms,
        element: <AcceptTermAndCondition />,
      },
      {
        path: RouterData.feedback,
        element: <Feedback />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: RouterData.auth.signin,
        element: <Signin />,
      },
      {
        path: RouterData.auth.signup,
        element: <Signup />,
      },
      {
        path: RouterData.auth.forgotPassword,
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default AppRouter;
