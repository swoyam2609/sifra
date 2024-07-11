import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/slices/mainSlices";
import Header from "../layouts/Dashboard/Header";
import ChatInput from "../layouts/Dashboard/ChatInput";
import { useNavigate } from "react-router-dom";
import { RouterData } from "../../router/RouterData";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | Sifra";
  }, []);

  const navigation = useNavigate();

  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // console.log(res.data);

      if (!res.data) {
        navigation(RouterData.login);
        return;
      }

      if (!res.data.verify) {
        navigation(RouterData.acceptTerms);
      } else {
        dispatch(setUserData(res.data));
      }
    } catch (error) {
      console.log(error);
      Cookies.remove("token");
      navigation(RouterData.login);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <div className="w-full h-full min-h-dvh bg-black2 text-white">
      <Header />
      <ChatInput />
    </div>
  );
};

export default Dashboard;
