/* eslint-disable react/no-unescaped-entities */
import { Typography } from "@material-tailwind/react";
import GeminiLogo from "../../components/GeminiLogo";

const About = () => {
  return (
    <div className="bg-black2 mt-16">
      <div className="w-full max-w-screen-2xl mx-auto p-4 pb-0 px-6 md:px-8 ">
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
              src="./assets/mainImage2.webp"
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
              Whether you need help staying organized, quick answers to burning
              questions, or just a friendly chat, Sifra is here to make your day
              brighter. 🌞💬
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
              effortlessly, making your daily routine smoother. With a friendly
              demeanor and intuitive interface, Sifra ensures every interaction
              is pleasant and productive. You'll find Sifra to be not just a
              tool, but a companion you can rely on.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
