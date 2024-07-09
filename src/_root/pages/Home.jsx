import { Typography } from "@material-tailwind/react";
import About from "../layouts/Home/About";
import { FloatingNav } from "../layouts/Home/FloatingHeader";
import Header from "../layouts/Home/Header";
import Hero from "../layouts/Home/Hero";
import MarqueeLayout from "../layouts/Home/MarqueeLayout";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouterData } from "../../router/RouterData";
import { animateScroll as scroll } from "react-scroll";

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
      <div className="w-full py-6 to-black1 mt-2">
        <div className="flex flex-row items-center gap-4 mx-auto max-w-max">
          <Link
            className="hover:text-secondary hover:underline transition-all ease-in-out duration-300"
            to={RouterData.termsAndCondition}
            onClick={() => {
              scroll.scrollToTop();
            }}
          >
            Terms and Conditions
          </Link>
          <Link
            className="hover:text-secondary hover:underline transition-all ease-in-out duration-300"
            to={RouterData.privacyPolicy}
            onClick={() => {
              scroll.scrollToTop();
            }}
          >
            Privacy policy{" "}
          </Link>
        </div>
        <Typography
          variant="small"
          className="text-white font-primary text-center mt-6"
        >
          {new Date().getFullYear()} @ Sifra. All rights reserved.
        </Typography>
      </div>
    </>
  );
};

export default Home;
