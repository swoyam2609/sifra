/* eslint-disable react/no-unknown-property */
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { FloatingNav } from "../layouts/Home/FloatingHeader";
import Header from "../layouts/Home/Header";
import { RouterData } from "../../router/RouterData";
import { Typography } from "@material-tailwind/react";

const Feedback = () => {
  return (
    <>
      <Header />
      <FloatingNav />
      <Wrapper>
        <div className="bg-white rounded-lg">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfqrPYkEXAqiOtQB7ogmPCogh-ArGCZbg6ituH1xp07RjnlKQ/viewform?embedded=true"
            height="1292"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            className="w-full"
          >
            Loading…
          </iframe>
        </div>
      </Wrapper>
      <div className="w-full py-6 to-black1 mt-12">
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

export default Feedback;
