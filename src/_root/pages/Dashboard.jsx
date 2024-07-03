import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/slices/mainSlices";
import Header from "../layouts/Dashboard/Header";
import ChatInput from "../layouts/Dashboard/ChatInput";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | Sifra";
  }, []);

  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      dispatch(setUserData(res.data));
    } catch (error) {
      console.error(error);
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
