/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import { RiLockPasswordLine, RiUser3Line } from "react-icons/ri";
import { Button, Chip, Typography } from "@material-tailwind/react";
import { RouterData } from "../../router/RouterData";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Signin = () => {
  useEffect(() => {
    document.title = "Login | Sifra";
  }, []);

  const [data, setDate] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    apimsg: "",
  });

  const handleChange = (e) => {
    setDate({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setErrors({
      ...errors,
      apimsg: "",
    });

    if (data.username === "" || data.password === "") {
      setLoading(false);
      return setErrors({
        ...errors,
        apimsg: "Please fill all fields",
      });
    }

    try {
      const response = await axios.get(`${API_URL}/users/login`, {
        params: {
          username: data.username,
          password: data.password,
        },
      });

      if (response.data.message === "Login successful") {
        Cookies.set("token", response.data.token);
        navigate(RouterData.dashboard);
        toast.success("Login successful", {
          duration: 4000,
          position: "top-center",
          className: "font-primary text-sm",
        });
      }
      console.log(response.data); // Log the response data

      setLoading(false);
      // Reset form fields
      setDate({
        username: "",
        password: "",
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message || "An error occurred", {
        duration: 4000,
        position: "top-center",
        className: "font-primary text-sm",
      });
      setErrors({
        ...errors,
        apimsg: error.response.data.message || "An error occurred",
      });
      console.log("Error fetching data:", error);
      // Handle error scenarios, e.g., show an error message to the user
    }
  };

  return (
    <div className="w-full h-[calc(100dvh_-_120px)] mt-4 max-w-[450px] mx-auto  flex flex-col justify-center gap-8">
      <div className="flex flex-col items-center justify-center">
        <Chip
          value="BETA VERSION"
          className="rounded-full font-primary bg-white text-black1 max-w-max mb-2 sm:hidden"
        />
        <Typography variant="h2" className="font-primary">
          Welcome Back !
        </Typography>
        <Typography variant="paragraph" className="font-primary text-white/60">
          Login to your account and chat with Sifra.
        </Typography>
      </div>
      <form className="flex flex-col gap-4 px-4" onSubmit={handleSubmit}>
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
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Label htmlFor="username" className="text-white/80">
            Password
          </Label>
          <div className="flex flex-row items-center gap-2 w-full">
            <div className="w-[40px] h-10 rounded grid place-content-center bg-primary/10">
              <RiLockPasswordLine />
            </div>
            <Input
              id="username"
              placeholder=""
              name="password"
              type="Password"
              onChange={handleChange}
              value={data.password}
              aria-label="Password"
            />
          </div>
          <Link
            to={RouterData.auth.forgotPassword}
            className="text-sm text-secondary underline ml-auto hover:text-secondary/80"
            aria-label="Forgot Password?"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="button-container w-full">
          <Button
            type="submit"
            className={`button flex flex-row items-center gap-1 bg-black1 font-primary w-full`}
            aria-label="Sign in"
            loading={loading}
            disabled={loading}
          >
            <span>{loading ? "Signing..." : "Sign in"}</span>
          </Button>
        </div>
        {errors.apimsg && (
          <div className="w-full mx-auto bg-red-500/10 px-3 py-2 rounded border-red-500 border">
            <Typography
              variant="paragraph"
              className="text-red-500 text-sm font-primary text-center"
            >
              {errors.apimsg}
            </Typography>
          </div>
        )}
      </form>

      <div className=" text-center flex flex-row items-center justify-center">
        <Typography variant="paragraph" className="text-white/60 font-primary">
          Don't have an account?
          <Link
            to={RouterData.auth.signup}
            className="text-primary font-primary underline ml-1 hover:text-secondary/80"
            aria-label="Sign up"
          >
            Sign up
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default Signin;
