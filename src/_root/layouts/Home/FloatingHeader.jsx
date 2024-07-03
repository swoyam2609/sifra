/* eslint-disable react/prop-types */
"use client";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Chip, Typography } from "@material-tailwind/react";
import { PrimaryBtn } from "../../../components/Button";
import { RiLoginCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { RouterData } from "../../../router/RouterData";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

export const FloatingNav = ({ className }) => {
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex  fixed top-0 inset-x-0 mx-auto bg-black2 z-[5000] w-full px-2 sm:px-4 py-2  pr-1 border-b-2 border-b-white/20 shadow-xl",
          className
        )}
      >
        <div className="max-w-screen-2xl w-full mx-auto py-2 px-6 md:px-8 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Typography
              variant="h3"
              className="font-primary text-white font-normal"
            >
              Sifra
            </Typography>
            <Chip
              value="BETA VERSION"
              className="rounded-full font-primary bg-white text-black1 hidden sm:flex"
            />
          </div>
          <div className="flex flex-row items-center gap-4">
            <PrimaryBtn
              className={"gap-2"}
              onClick={() => {
                navigate(RouterData.auth.signup);
              }}
            >
              <RiLoginCircleLine className="text-lg" />
              <span className="text-sm">Join Now</span>
            </PrimaryBtn>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
