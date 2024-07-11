import { Typography } from "@material-tailwind/react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import loader from "../../data/animation/loader2.json";
import GeminiLogo from "../components/GeminiLogo";
import { PrimaryBtn } from "../../components/Button";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-dvh bg-black2 text-white font-primary p-4 overflow-hidden">
      <div className="w-full h-full grid lg:grid-cols-2 grid-cols-1 gap-6">
        <div className="px-0 sm:px-2 overflow-y-scroll">
          <div className="flex flex-row items-center justify-between gap-6">
            <div className="flex flex-row items-center">
              <Lottie
                animationData={loader}
                loop={true}
                className="size-[60px] relative z-10"
              />
              <div className="size-[80px] bg-primary blur-[80px]  absolute -top-4 -left-2 -z-1"></div>
              <Typography
                variant="h3"
                className="font-primary text-white font-normal -ml-1"
              >
                Sifra
              </Typography>
            </div>
            <div className="w-full max-w-[140px] sm:max-w-[150px]">
              <GeminiLogo />
            </div>
          </div>
          <div className="w-full flex items-center justify-center flex-col gap-8 h-[calc(100dvh_-_100px)]">
            <div className="flex flex-col gap-4 items-center justify-center">
              <h2 className="text-8xl sm:text-[16vw] uppercase font-bold leading-[0.8]">
                404
              </h2>
              <p className="text-base text-white/80">Page Not Found</p>
            </div>
            <PrimaryBtn onClick={() => navigate("/")}>
              <span>Go Home</span>
            </PrimaryBtn>
          </div>
        </div>
        <div className="hidden lg:flex h-[calc(100dvh_-_32px)] relative overflow-hidden rounded-md">
          <img
            src="/assets/mainImage.webp"
            alt=""
            className="w-full h-full object-contain relative z-10"
          />

          <div className="size-[200px] bg-primary blur-[150px]  absolute -top-4 -left-2 -z-1"></div>
          <div className="size-[200px] bg-secondary blur-[100px]  absolute -bottom-4 -right-2 -z-1"></div>
          <img
            src="/assets/vector-line.svg"
            alt="vector"
            className="absolute bottom-0 left-0 mix-blend-overlay w-full h-auto scale-150 sm:scale-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Error404;
