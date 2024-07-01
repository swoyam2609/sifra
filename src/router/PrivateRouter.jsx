/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { RouterData } from "./RouterData";

const PrivateRouter = ({ children }) => {
  const token = Cookies.get("token");
  //   const token = false;
  return token ? children : <Navigate to={RouterData.home.link} />;
};

export default PrivateRouter;
