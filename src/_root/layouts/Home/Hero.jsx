import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { PrimaryBtn } from "../../../components/Button";
import { RiMessage3Line } from "react-icons/ri";
import GeminiLogo from "../../components/GeminiLogo";
import { FlipWords } from "../../components/FlipWords";
import { useNavigate } from "react-router-dom";
import { RouterData } from "../../../router/RouterData";

const Hero = () => {
  const navigate = useNavigate();

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const words = ["Buddy", "Friend", "Assistant"];

  return (
    <div className="w-full h-full min-h-dvh relative overflow-hidden">
      <div className="size-[400px] bg-secondary blur-[180px] opacity-15 absolute -bottom-4 -left-2 -z-1"></div>
      <div className="w-full max-w-screen-2xl mx-auto p-4 px-6 md:px-8 flex flex-col gap-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col lg:flex-row w-full text-white h-[calc(100dvh_-_120px)]"
        >
          <motion.div
            variants={fadeInUp}
            className="text w-full flex gap-4 flex-col  mt-24 sm:mt-16"
          >
            <Typography
              variant="h1"
              className="font-primary text-5xl sm:text-7xl font-normal text-white leading-[1.2] sm:leading-[1.25]"
            >
              Meet <span className="font-bold graText">Sifra</span>, Your <br />{" "}
              AI
              <FlipWords words={words} />
            </Typography>
            <Typography
              variant="paragraph"
              className="font-primary font-normal text-white/60 w-full max-w-[400px]"
            >
              Here to help you stay organized, answer questions, and chat
              anytime.
            </Typography>
            <div className="mt-4 flex flex-row items-center flex-wrap gap-2">
              <PrimaryBtn
                className={"max-w-"}
                onClick={() => {
                  navigate(RouterData.auth.signin);
                }}
              >
                <RiMessage3Line className="text-lg mr-1" />
                <span>Chat Now</span>
              </PrimaryBtn>
              <div className="w-[150px] sm:w-[200px]">
                <GeminiLogo />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="images w-full relative"
          >
            <img
              src="./assets/mainImage.webp"
              alt="Sifra AI Buddy"
              className="w-full h-full object-contain relative lg:scale-125"
            />
            <div className="size-[180px] bg-primary blur-[80px] opacity-50 absolute bottom-6 left-1/2 -z-1"></div>
          </motion.div>
        </motion.div>
      </div>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        src="./assets/vector-line.svg"
        alt="vector"
        className="absolute bottom-0 left-0 mix-blend-overlay w-full h-auto scale-150 sm:scale-100"
      />
    </div>
  );
};

export default Hero;
