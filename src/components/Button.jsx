/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";

export const PrimaryBtn = ({ children, className, ...props }) => {
  return (
    <div className="button-container w-full max-w-max">
      <Button
        className={`button flex flex-row items-center gap-1 font-primary ${className}`}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};
