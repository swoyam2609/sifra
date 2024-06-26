import LoadingIcon from "../../data/animation/loader.gif";
import { Typography } from "@material-tailwind/react";

const Loading = () => {
  return (
    <div className="bg-[#07010D] w-full h-dvh overflow-hidden grid place-content-center relative">
      {/* <Lottie animationData={LoadingIcon} loop className="size-[100px]"/> */}
      <img
        src={LoadingIcon}
        alt="loading..."
        className="size-[80px] object-cover mx-auto"
      />
      <Typography
        variant="h5"
        color="white"
        className="text-center mt-4 font-primary font-normal"
      >
        Sifra
      </Typography>
      <div className="absolute bottom-6 right-6">
        <Typography
          variant="h6"
          className="text-center mt-4 font-primary font-normal text-white/50"
        >
          Loading...
        </Typography>
      </div>
    </div>
  );
};

export default Loading;
