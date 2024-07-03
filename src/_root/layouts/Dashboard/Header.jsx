import { Button, Tooltip, Typography } from "@material-tailwind/react";
// import Lottie from "lottie-react";
// import loader from "../../../data/animation/loader2.json";
import Wrapper from "../../components/Wrapper";
import Gravatar from "react-gravatar";
import { useSelector } from "react-redux";
import GeminiLogo from "../../components/GeminiLogo";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { RouterData } from "../../../router/RouterData";
import toast from "react-hot-toast";

const Header = () => {
  const userData = useSelector((state) => state.main.userData);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    navigate(RouterData.home.link);
    toast.success("Logout successfully", {
      position: "top-center",
      className: "font-primary text-sm",
    });
  };

  return (
    <div className="w-full h-full">
      <Wrapper>
        <div className="flex flex-row items-center justify-between gap-6">
          <div className="flex flex-row items-center">
            {/* <Lottie
              animationData={loader}
              loop={true}
              className="size-[60px] relative z-10"
            /> */}
            <div className="size-[80px] bg-primary blur-[80px]  absolute -top-4 -left-2 -z-1"></div>
            <Typography
              variant="h3"
              className="font-primary text-white font-normal -ml-1"
            >
              Sifra
            </Typography>
            <div className="w-[80px] sm:w-[100px] ml-2 flex ">
              <GeminiLogo />
            </div>
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center gap-2">
              <div className="sm:flex flex-col  text-right hidden">
                <Typography className="font-primary text-base" variant="small">
                  {userData?.name}
                </Typography>
                <Typography
                  className="font-primary text-white/60"
                  variant="small"
                >
                  {userData?.email}
                </Typography>
              </div>
              <Gravatar
                email={userData?.email}
                size={50}
                className="rounded-full border-4 border-white"
              />
            </div>
            <Tooltip content="logout" className="font-primary">
              <Button
                className="bg-white/10 text-lg w-[40px] rounded grid place-content-center"
                onClick={logout}
              >
                <RiLogoutBoxRLine />
              </Button>
            </Tooltip>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
