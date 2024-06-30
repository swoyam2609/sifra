import { Typography } from "@material-tailwind/react";
import Wrapper from "../../components/Wrapper";
import { RiLoginCircleLine } from "react-icons/ri";
import { PrimaryBtn } from "../../../components/Button";

const Header = () => {
  return (
    <header>
      <Wrapper>
        <div className="flex flex-row items-center justify-between gap-4 flex-wrap">
          <Typography
            variant="h3"
            className="font-primary text-white font-normal"
          >
            Sifra
          </Typography>
          <div className="flex flex-row items-center gap-4">
            <PrimaryBtn className={"gap-2"}>
              <RiLoginCircleLine className="text-lg" />
              <span className="text-sm">Join Now</span>
            </PrimaryBtn>
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
