import { Typography } from "@material-tailwind/react";
import About from "../layouts/Home/About";
import { FloatingNav } from "../layouts/Home/FloatingHeader";
import Header from "../layouts/Home/Header";
import Hero from "../layouts/Home/Hero";
import MarqueeLayout from "../layouts/Home/MarqueeLayout";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RouterData } from "../../router/RouterData";

const Home = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(RouterData.dashboard);
    }
  }, [token]);

  return (
    <>
      <Header />
      <FloatingNav />
      <Hero />
      <MarqueeLayout />
      <About />
      <div className="w-full py-6 to-black1">
        <Typography
          variant="small"
          className="text-white font-primary text-center"
        >
          {new Date().getFullYear()} @ Sifra. All rights reserved.
        </Typography>
      </div>
    </>
  );
};

export default Home;
