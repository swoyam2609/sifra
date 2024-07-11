import { Button, Typography, Dialog } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import {
  RiArrowLeftLine,
  RiLockPasswordLine,
  RiMailLine,
  RiUser3Line,
  RiUser4Line,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { RouterData } from "../../router/RouterData";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import Lottie from "lottie-react";
import success from "../../data/animation/success2.json";

const Signup = () => {
  useEffect(() => {
    document.title = "Join | Sifra";
  }, []);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    msg: "",
    apimsg: "",
    password: "",
    username: "", // Add this line
  });

  const [data, setData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
  });

  const [otp, setOtp] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(!open);

  const validateUsername = (username) => {
    const regex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    return regex.test(username);
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => password.length >= 8;

  const validateForm = () => {
    const { username, password, name, email } = data;
    const emailIsValid = validateEmail(email);
    const passwordIsValid = validatePassword(password);
    const usernameIsValid = validateUsername(username);

    // Set errors for all fields
    setErrors({
      email: emailIsValid ? "" : "Please enter a valid email address",
      password: passwordIsValid
        ? ""
        : "Password must be at least 8 characters long",
      username: usernameIsValid
        ? ""
        : "Username must be 1-30 characters long and can only contain letters, numbers, periods, and underscores. It cannot start or end with a period or have two consecutive periods.",
    });

    return emailIsValid && passwordIsValid && usernameIsValid && name;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    if (name === "email") {
      const isValid = validateEmail(value);
      setErrors({
        ...errors,
        email: isValid ? "" : "Please enter a valid email address",
      });
    } else if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(value)
          ? ""
          : "Password must be at least 8 characters long",
      }));
    } else if (name === "username") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: validateUsername(value)
          ? ""
          : "Username must be 1-30 characters long and can only contain letters, numbers, periods, and underscores. It cannot start or end with a period or have two consecutive periods.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(data);
    // alert(JSON.stringify(data, null, 2));

    const isValid = validateForm();
    if (!isValid) {
      setErrors({
        ...errors,
        msg: "Please fill out all fields correctly.",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/users/signup`, {
        name: data.name.trim(),
        username: data.username.trim(),
        email: data.email.trim(),
        password: data.password.trim(),
      });

      //   console.log("User :", res.data);
      if (res.data.message === "OTP sent successfully") {
        toast.success("OTP sent successfully", {
          duration: 4000,
          position: "top-center",
          className: "font-primary text-sm",
        });
        setOtpModal(true);
        setLoading(false);
      } else {
        setErrors({
          ...errors,
          msg: res.message,
        });
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      setErrors({
        ...errors,
        msg:
          error.response.data.message ||
          "An error occurred while submitting the form.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP", {
        duration: 4000,
        position: "top-center",
        className: "font-primary text-sm",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/users/signup/verify?otp=${otp}`,
        {
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
        }
      );

      if (res.data.message === "User created successfully") {
        // toast.success("User created successfully, Now Login your Account", {
        //   duration: 4000,
        //   position: "top-center",
        //   className: "font-primary text-sm",
        // });
        setLoading(false);
        setOpen(true);
        setOtpModal(false);
        setData({
          ...data,
          email: "",
          name: "",
          username: "",
          password: "",
        });
      }
    } catch (error) {
      console.log("Error verifying OTP:", error);
      setErrors({
        ...errors,
        apimsg:
          error.response.data.message ||
          "An error occurred while verifying the OTP.",
      });
    }
  };

  return (
    <>
      {otpModal ? (
        <div className="relative">
          <div className="absolute top-0 left-0">
            <Button
              className="bg-transparent font-primary shadow-none flex flex-row items-center gap-2"
              onClick={() => {
                setOtpModal(false);
                setOtp("");
              }}
            >
              <RiArrowLeftLine className="text-sm" />
              <span className="text-sm font-primary font-normal">Back</span>
            </Button>
          </div>
          <div className="w-full h-full min-h-[calc(100dvh_-_120px)] mt-4 max-w-[450px] mx-auto  flex flex-col justify-center gap-8 relative">
            <div className="flex flex-col items-center justify-center mt-12">
              <Typography variant="h2" className="font-primary">
                Verify Account
              </Typography>
              <Typography
                variant="paragraph"
                className="font-primary text-white/60 font-normal w-full max-w-[320px] text-center"
              >
                Enter the OTP sent to your email and verify your account.
              </Typography>
              <Typography
                variant="paragraph"
                className="text-white/60 font-primary mt-4 text-center"
              >
                OTP sent to{" "}
                <span className="text-primary underline">{data.email}</span>
              </Typography>
            </div>
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
            <div className="button-container w-full max-w-[300px] mx-auto mt-4">
              <Button
                type="submit"
                className={`button flex flex-row items-center gap-1 bg-black1 font-primary w-full`}
                aria-label="Sign up"
                loading={loading}
                disabled={loading}
                onClick={handleVerify}
              >
                <span>{loading ? "Verifying..." : "Verify Account"}</span>
              </Button>
            </div>
            {errors.apimsg && (
              <div className="w-full max-w-[300px] mx-auto bg-red-500/10 px-3 py-2 rounded border-red-500 border">
                <Typography
                  variant="paragraph"
                  className="text-red-500 text-sm font-primary text-center"
                >
                  {errors.apimsg}
                </Typography>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full min-h-[calc(100dvh_-_120px)] mt-4 max-w-[450px] mx-auto  flex flex-col justify-center gap-8">
          <div className="flex flex-col items-center justify-center mt-0 sm:mt-12">
            <Typography variant="h2" className="font-primary text-center">
              Join Sifra Today!
            </Typography>
            <Typography
              variant="paragraph"
              className="font-primary text-white/60 text-center"
            >
              Create an account to chat with Sifra.
            </Typography>
          </div>
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
          <form className="flex flex-col gap-4 px-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <Label htmlFor="name" className="text-white/80">
                Full Name
              </Label>
              <div className="flex flex-row items-center gap-2 w-full">
                <div className="w-[40px] h-10 rounded grid place-content-center bg-primary/10">
                  <RiUser4Line />
                </div>
                <Input
                  id="name"
                  name="name"
                  placeholder=""
                  type="text"
                  onChange={handleChange}
                  value={data.name}
                  aria-label="Full Name"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="username" className="text-white/80">
                User Name
              </Label>
              <div className="flex flex-row items-center gap-2 w-full">
                <div className="w-[40px] h-10 rounded grid place-content-center bg-primary/10">
                  <RiUser3Line />
                </div>
                <Input
                  id="username"
                  name="username"
                  placeholder=""
                  type="text"
                  onChange={handleChange}
                  value={data.username}
                  aria-label="User Name"
                />
              </div>
              {errors.username && (
                <Typography
                  variant="paragraph"
                  className="text-red-300 text-sm font-primary"
                >
                  Error: {errors.username}
                </Typography>
              )}
            </div>
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
            <div className="flex flex-col gap-4">
              <Label htmlFor="password" className="text-white/80">
                Password
              </Label>
              <div className="flex flex-row items-center gap-2 w-full">
                <div className="w-[40px] h-10 rounded grid place-content-center bg-primary/10">
                  <RiLockPasswordLine />
                </div>
                <Input
                  id="password"
                  placeholder=""
                  name="password"
                  type="Password"
                  onChange={handleChange}
                  value={data.password}
                  aria-label="Password"
                />
              </div>
              {errors.password && (
                <Typography
                  variant="paragraph"
                  className="text-red-300 text-sm font-primary"
                >
                  Error: {errors.password}
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
                <span>Sign up</span>
              </Button>
            </div>
          </form>
          <div className=" text-center flex flex-row items-center justify-center ">
            <Typography
              variant="paragraph"
              className="text-white/60 font-primary"
            >
              Already have an account?
              <Link
                to={RouterData.auth.signin}
                className="text-primary font-primary underline ml-1 hover:text-secondary/80"
                aria-label="Sign in"
              >
                Sign in
              </Link>
            </Typography>
          </div>
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
              Your Account is Verified!
            </Typography>
            <Typography
              variant="paragraph"
              className="text-white/80 font-primary"
            >
              Your account has been verified successfully. Now you can login to
              your account.
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
    </>
  );
};

export default Signup;
