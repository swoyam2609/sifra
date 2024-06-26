/* eslint-disable react/no-unescaped-entities */
import { Button, Typography, Dialog } from "@material-tailwind/react";
import GeminiLogo from "../components/GeminiLogo";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import success from "../../data/animation/success2.json";
import axios from "axios";
import { API_URL } from "../../utils/constant";

const ComingSoon = () => {
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

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        await axios.post(
          `${API_URL}/user/waitlist?email=${encodeURIComponent(email)}`,
          {},
          {
            headers: {
              accept: "application/json",
            },
          }
        );

        handleOpen();
        setEmail("");
      } catch (error) {
        console.error("Error submitting email:", error);
        setError(
          "An error occurred while submitting your email. Please try again later."
        );
        toast.error(
          error.response.data.message ||
            "An error occurred while submitting your email. Please try again later."
        );
      }
    } else {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <div className="w-full h-full bg-black2 overflow-x-hidden relative">
      <div className="size-[300px] bg-secondary blur-[150px] opacity-50 absolute -top-2 -right-2 -z-1"></div>

      {/* hero */}
      <div className="w-full h-full min-h-dvh relative overflow-hidden">
        <div className="size-[300px] bg-primary blur-[150px] opacity-20 absolute -bottom-4 -left-2 -z-1"></div>
        <div className="w-full max-w-screen-2xl mx-auto p-4 px-6 md:px-8 flex flex-col gap-8 relative z-10">
          <div className="flex flex-row items-center justify-between gap-6">
            <Typography
              variant="h3"
              className="font-primary text-white font-normal"
            >
              Sifra
            </Typography>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-[140px] sm:max-w-[180px]"
            >
              <GeminiLogo />
            </motion.div>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col lg:flex-row w-full text-white h-[calc(100dvh_-_120px)]"
          >
            <motion.div
              variants={fadeInUp}
              className="text w-full flex gap-4 flex-col mt-8"
            >
              <Typography
                variant="h1"
                className="font-primary text-5xl sm:text-7xl font-normal text-white"
              >
                Meet <span className="font-bold graText">Sifra</span>, Your AI
                Buddy!
              </Typography>
              <Typography
                variant="paragraph"
                className="font-primary font-normal text-white/60 w-full max-w-[400px]"
              >
                Here to help you stay organized, answer questions, and chat
                anytime.
              </Typography>
              <div>
                <form
                  className={`border ${
                    error ? "border-red-500" : "border-white/40"
                  }  w-full max-w-fit p-2 rounded-md pl-4 flex flex-row mt-4`}
                  onSubmit={handleSubmit}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-transparent outline-none font-primary w-full flex-1 md:min-w-[500px] lg:min-w-[400px] pr-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button className="font-primary gr rounded" type="submit">
                    Notify me!
                  </Button>
                </form>
                <Typography
                  variant="paragraph"
                  className={`font-primary text-xs mt-2 font-normal ${
                    error ? "text-red-500" : "text-white/60"
                  }  w-full max-w-[400px]`}
                >
                  {error
                    ? error
                    : "Note : Fill the form to get notified when we launch."}
                </Typography>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="images w-full relative"
            >
              <img
                src="./assets/mainImage.png"
                alt="Sifra AI Buddy"
                className="w-full h-full object-contain relative lg:scale-125"
              />
              <div className="size-[140px] bg-primary blur-[80px] opacity-50 absolute bottom-6 left-1/2 -z-1"></div>
            </motion.div>
          </motion.div>
        </div>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src="./assets/vector-line.svg"
          alt="vector"
          className="absolute bottom-0 left-0 mix-blend-overlay w-full h-auto"
        />
      </div>
      <div className="w-full h-full bg-black1">
        <div
          className="w-full max-w-screen-2xl mx-auto p-4 px-6 md:px-8"
          data-aos="fade-up"
          data-aos-easing="ease-in-out"
          data-aos-delay="500"
          data-aos-offset="0"
        >
          <Typography
            variant="h2"
            className="font-primary mt-2 font-bold text-white text-center uppercase text-[12vw] opacity-30 mix-blend-overlay"
          >
            Coming Soon
          </Typography>
        </div>
        <div className="w-full max-w-screen-2xl mx-auto p-4 pb-0 px-6 md:px-8">
          <div className="flex flex-row items-center justify-between gap-8 flex-wrap">
            <div
              data-aos="fade-up"
              data-aos-easing="ease-in-out"
              data-aos-delay="550"
              data-aos-offset="0"
            >
              <Typography
                variant="h2"
                className="text-white font-primary font-normal text-5xl"
              >
                About <span className="font-bold text-primary">Sifra</span>
              </Typography>
              <Typography
                variant="paragraph"
                className="text-white/80 font-primary font-normal mt-1 pr-4"
              >
                your 24/7 personal Artificial Intelligence buddy! 🤖✨
              </Typography>
            </div>
            <div
              data-aos="fade-up"
              data-aos-easing="ease-in-out"
              data-aos-delay="550"
              data-aos-offset="0"
              className="w-full max-w-[140px] sm:max-w-[200px]"
            >
              <GeminiLogo />
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row gap-8 mt-8">
            <div className="w-full h-full">
              <img
                src="./assets/mainImage2.png"
                alt="Sifra AI Buddy"
                className="w-full h-full"
              />
            </div>
            <div
              data-aos-easing="ease-in-out"
              className="text-white/80 w-full h-full sm:min-h-[400px] lg:min-h-[600px] flex flex-col justify-center gap-2"
            >
              <Typography
                variant="paragraph"
                className="font-primary font-normal"
              >
                Whether you need help staying organized, quick answers to
                burning questions, or just a friendly chat, Sifra is here to
                make your day brighter. 🌞💬
              </Typography>
              <Typography
                variant="paragraph"
                className="font-primary font-normal"
              >
                Powered by Google’s latest Gemini model, Sifra not only
                understands your needs with precision but also remembers your
                preferences and past conversations, ensuring a personalized
                experience every time.
              </Typography>
              <Typography
                variant="paragraph"
                className="font-primary font-normal"
              >
                Sifra leverages advanced AI technology to understand and respond
                to your queries accurately. No matter the complexity of your
                question, Sifra has got you covered. By remembering your past
                interactions, Sifra provides tailored responses that align with
                your preferences and needs. It's like having a friend who knows
                you well.
              </Typography>
              <Typography
                variant="paragraph"
                className="font-primary font-normal"
              >
                From setting reminders and managing your schedule to engaging in
                meaningful conversations, Sifra adapts to various tasks
                effortlessly, making your daily routine smoother. With a
                friendly demeanor and intuitive interface, Sifra ensures every
                interaction is pleasant and productive. You'll find Sifra to be
                not just a tool, but a companion you can rely on.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-6">
        <Typography
          variant="small"
          className="text-white font-primary text-center"
        >
          {new Date().getFullYear()} @ Sifra. All rights reserved.
        </Typography>
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-black1 pb-10 relative"
      >
        <div>
          <Lottie animationData={success} loop className="w-[300px] mx-auto" />
          <div className="flex flex-col gap-1 items-center justify-center w-full max-w-[350px] mx-auto text-center">
            <Typography variant="h3" className="text-white font-primary">
              You have been added to our waitlist!
            </Typography>
            <Typography
              variant="paragraph"
              className="text-white/80 font-primary"
            >
              Thanks for your interest in Sifra! We'll notify you as soon as we
              launch.
            </Typography>
            <Button
              className="bg-transparent mt-2 shadow-none hover:shadow-none hover:bg-red-500/10"
              onClick={() => {
                setOpen(!open);
              }}
              size="md"
            >
              <span className="font-primary text-red-500 underline font-normal">
                Close
              </span>
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ComingSoon;
