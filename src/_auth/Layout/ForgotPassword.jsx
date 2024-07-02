import { Button, Dialog, Typography } from "@material-tailwind/react";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import {
  RiArrowLeftLine,
  RiLockPasswordLine,
  RiMailLine,
} from "react-icons/ri";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { RouterData } from "../../router/RouterData";
import OTPInput from "react-otp-input";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import success from "../../data/animation/success2.json";

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "Forgot Password | Sifra";
  }, []);

  const [data, setData] = useState({
    email: "",
    newPassword: "",
  });

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const [otpModal, setOtpModal] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    newPassword: "",
    otp: "",
    msg: "",
  });

  const validateEmail = (email) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      const isValid = validateEmail(value);
      setErrors({
        ...errors,
        email: isValid ? "" : "Please enter a valid email address",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({
      email: "",
      newPassword: "",
      otp: "",
      msg: "",
    });

    if (data.email === "") {
      setLoading(false);
      return setErrors({
        email: "Please enter your email address",
        newPassword: "",
        otp: "",
        msg: "",
      });
    }

    try {
      const res = await axios.post(
        `${API_URL}/user/forgetpassword?email=${data.email}`
      );

      toast.success(res.data.message, {
        duration: 4000,
        position: "top-center",
        className: "font-primary text-sm",
      });

      setOtpModal(true);
      setLoading(false);
    } catch (error) {
      console.log("error : ", error.response.data || "Something went wrong");
      setErrors({
        email: "",
        newPassword: "",
        otp: "",
        msg: error.response.data.message || "Something went wrong",
      });
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({
      email: "",
      newPassword: "",
      otp: "",
      msg: "",
    });

    if (otp.length !== 6) {
      setLoading(false);
      return setErrors({
        email: "",
        newPassword: "",
        msg: "Please enter a valid OTP",
      });
    }
    console.log(data);

    if (data.newPassword.length === 0) {
      setLoading(false);
      return setErrors({
        email: "",
        msg: "Please enter your new password",
      });
    }

    try {
      await axios
        .post(
          `${API_URL}/user/forgetpassword/verify?email=${data.email}&otp=${otp}&new_password=${data.newPassword}`
        )
        .then(() => {
          setLoading(false);
          setOpen(true);
          setOtpModal(false);
          setData({
            email: "",
            newPassword: "",
          });
        });
    } catch (error) {
      console.log(
        "error : ",
        error.response.data.message || "Something went wrong"
      );
      setErrors({
        email: "",
        newPassword: "",
        otp: "",
        msg: error.response.data.message || "Something went wrong",
      });

      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className="relative w-full">
      <div className="absolute top-0 left-0">
        <Button
          className="bg-transparent font-primary shadow-none flex flex-row items-center gap-2"
          onClick={() => {
            if (otpModal) {
              setOtpModal(false);
              setOtp("");
              setErrors({
                ...errors,
                msg: "",
              });
            } else {
              navigate(RouterData.auth.signin);
            }
          }}
        >
          <RiArrowLeftLine className="text-sm" />
          <span className="text-sm font-primary font-normal">Back</span>
        </Button>
      </div>
      {otpModal ? (
        <div className="w-full h-full min-h-[calc(100dvh_-_130px)] mt-4 max-w-[450px] mx-auto  flex flex-col justify-center gap-8">
          <div className="flex flex-col items-center justify-center mt-20">
            <Typography variant="h2" className="font-primary text-center">
              Verify Email Address
            </Typography>
            <Typography
              variant="paragraph"
              className="font-primary text-white/60 text-center mx-auto max-w-[400px]"
            >
              Enter the OTP sent to your email address to reset your password.
            </Typography>
            <Typography
              variant="paragraph"
              className="text-white/60 font-primary mt-4 text-center"
            >
              OTP sent to{" "}
              <span className="text-primary underline">{data.email}</span>
            </Typography>
          </div>
          <form
            className="flex flex-col gap-4 px-4 pb-6"
            onSubmit={handleOtpSubmit}
          >
            {errors.msg && (
              <div className="bg-red-500/10 px-3 py-2 rounded border-red-500 border">
                <Typography
                  variant="paragraph"
                  className="text-red-500 text-sm font-primary text-center"
                >
                  {errors.msg}
                </Typography>
              </div>
            )}
            <div className="flex flex-col gap-4">
              <Label htmlFor="otp" className="text-white/80">
                OTP
              </Label>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={""}
                inputType="number"
                containerStyle={
                  "flex flex-row  gap-4 justify-center rounded-md flex-wrap"
                }
                inputStyle={
                  "!w-10 sm:!w-14 sm:!w-10 !h-12 bg-black2 text-white text-center rounded-md border border-gray-50/10 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/50 font-primary font-normal text-lg"
                }
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="newPassword" className="text-white/80">
                New Password
              </Label>
              <div className="flex flex-row items-center gap-2 w-full">
                <div className="w-[40px] h-10 rounded grid place-content-center bg-primary/10">
                  <RiLockPasswordLine />
                </div>
                <Input
                  id="newPassword"
                  placeholder=""
                  name="newPassword"
                  type="Password"
                  onChange={handleChange}
                  value={data.newPassword}
                  aria-label="New Password"
                />
              </div>
            </div>
            <div className="button-container w-full mt-4">
              <Button
                type="submit"
                className={`button flex flex-row items-center gap-1 bg-black1 font-primary w-full`}
                aria-label="Sign up"
                loading={loading}
                disabled={loading}
              >
                <span>{loading ? "Loading..." : "Change Password"}</span>
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full !h-[calc(100dvh_-_130px)] mt-4 max-w-[450px] mx-auto  flex flex-col justify-center gap-8">
          <div className="flex flex-col items-center justify-center ">
            <Typography variant="h2" className="font-primary">
              Forgot Password?
            </Typography>
            <Typography
              variant="paragraph"
              className="font-primary text-white/60 text-center mx-auto max-w-[400px]"
            >
              Enter your email address to reset your password by receiving an
              OTP.
            </Typography>
          </div>

          <form className="flex flex-col gap-4 px-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <Label htmlFor="email" className="text-white/80">
                Email Address
              </Label>
              <div className="flex flex-row items-center gap-2 w-full">
                <div className="w-[40px] h-10 rounded grid place-content-center bg-primary/10">
                  <RiMailLine />
                </div>
                <Input
                  id="email"
                  name="email"
                  placeholder=""
                  type="text"
                  onChange={handleChange}
                  value={data.email}
                  aria-label="Email Address"
                />
              </div>
              {errors.email && (
                <Typography
                  variant="paragraph"
                  className="text-red-300 text-sm font-primary"
                >
                  Error : {errors.email}
                </Typography>
              )}
            </div>
            <div className="button-container w-full mt-4">
              <Button
                type="submit"
                className={`button flex flex-row items-center gap-1 bg-black1 font-primary w-full`}
                aria-label="Sign up"
                loading={loading}
                disabled={loading}
              >
                <span>{loading ? "Loading..." : "Send OTP"}</span>
              </Button>
            </div>
          </form>
        </div>
      )}
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-black1 pb-10 relative"
      >
        <div>
          <Lottie animationData={success} loop className="w-[300px] mx-auto" />
          <div className="flex flex-col gap-1 items-center justify-center w-full max-w-[350px] mx-auto text-center">
            <Typography variant="h3" className="text-white font-primary">
              Your Password has been changed successfully.
            </Typography>
            <Typography
              variant="paragraph"
              className="text-white/80 font-primary"
            >
              You can now sign in with your new password.
            </Typography>

            <div className="button-container max-w-max w-full mt-4">
              <Button
                type="submit"
                className={`button flex flex-row items-center gap-1 bg-black1 font-primary w-full`}
                aria-label="Sign up"
                loading={loading}
                disabled={loading}
                onClick={() => {
                  setOtpModal(false);
                  setOtp("");
                  setOpen(false);
                  navigate(RouterData.auth.signin);
                }}
              >
                <span>Sign in</span>
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ForgotPassword;
