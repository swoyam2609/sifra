import { useEffect } from "react";

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "Forgot Password | Sifra";
  }, []);
  return <div>ForgotPassword</div>;
};

export default ForgotPassword;
