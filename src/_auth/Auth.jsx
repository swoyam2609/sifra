import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouterData } from "../router/RouterData";
import { Chip, Typography } from "@material-tailwind/react";
import GeminiLogo from "../_root/components/GeminiLogo";
import Lottie from "lottie-react";
import loader from "../data/animation/loader2.json";
import Cookies from "js-cookie";
const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/auth" || location.pathname === "/auth/") {
      navigate(RouterData.auth.signin);
    }
  }, [location, navigate]);

  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      navigate(RouterData.dashboard);
    }
  }, [token]);

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
              <Chip
                value="BETA VERSION"
                className="rounded-full font-primary bg-white text-black1 max-w-max ml-2 hidden sm:flex"
              />
            </div>
            <div className="w-full max-w-[140px] sm:max-w-[150px]">
              <GeminiLogo />
            </div>
          </div>
          <Suspense
            fallback={
              <div className="w-full h-full grid place-content-center">
                <span>Loading...</span>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
        <div className="hidden lg:flex h-[calc(100dvh_-_32px)] relative overflow-hidden rounded-md">
          <img
            src="/assets/mainImage.png"
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

export default Auth;
