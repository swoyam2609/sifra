import Marquee from "react-fast-marquee";
import { RiRobot3Line } from "react-icons/ri";

const MarqueeLayout = () => {
  const tags = [
    "AI Companion",
    "Personal Assistant",
    "Smart Assistant",
    "AI Chatbot",
    "Powered By Gemini",
    "Personalized Experience",
    "Intuitive Interface",
    "Reminder Setting",
    "Schedule Management",
    "Meaningful Conversations",
    "Advanced AI",
    "Friendly AI",
    "Productivity Booster",
    "Tech Innovation",
    "AI CompanionApp",
  ];

  return (
    <>
      <div className="bg-secondary py-4 text-white">
        <Marquee className="gap-4">
          {tags.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center gap-4 text-lg sm:text-2xl"
            >
              <span>{item}</span>
              <div className="mr-4 size-[40px] grid place-content-center bg-white/20 rounded-full">
                <RiRobot3Line />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
      <div className="bg-primary py-4 text-white">
        <Marquee className="gap-4" direction="right">
          {tags.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center gap-4 text-lg sm:text-2xl"
            >
              <span>{item}</span>
              <div className="mr-4 size-[40px] grid place-content-center bg-white/20 rounded-full">
                <RiRobot3Line />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
};

export default MarqueeLayout;
