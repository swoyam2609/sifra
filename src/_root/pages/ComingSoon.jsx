import { Typography } from "@material-tailwind/react";
import GeminiLogo from "../components/GeminiLogo";

const ComingSoon = () => {
  return (
    <div className="w-full h-full bg-black1 min-h-dvh">
      <div className="w-full max-w-screen-2xl mx-auto p-4">
        <div className="flex flex-row items-center justify-between gap-6">
          <Typography
            variant="h3"
            className="font-primary text-white font-normal"
          >
            Sifra
          </Typography>
          <GeminiLogo />
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
