import { Typography } from "@material-tailwind/react";
import Lottie from "lottie-react";
import loader from "../../data/animation/loader2.json";
const Loading = () => {
  return (
    <div className="bg-[#07010D] w-full h-dvh overflow-hidden grid place-content-center relative">
      {/* <Lottie animationData={LoadingIcon} loop className="size-[100px]"/> */}
      <Lottie
        animationData={loader}
        loop={true}
        className="size-[100px] scale-150"
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
