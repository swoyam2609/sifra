/* eslint-disable react/no-unescaped-entities */
import { Typography } from "@material-tailwind/react";
import { FloatingNav } from "../layouts/Home/FloatingHeader";
import Header from "../layouts/Home/Header";
import GeminiLogo from "../components/GeminiLogo";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import { RouterData } from "../../router/RouterData";
import { animateScroll as scroll } from "react-scroll";
const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <FloatingNav />
      <Wrapper>
        <div className="w-full h-full min-h-dvh mt-12">
          <div className="flex flex-row items-center justify-between gap-8 flex-wrap">
            <div>
              <Typography
                variant="h2"
                className="text-white font-primary font-normal text-5xl w-full max-w-[500px]"
              >
                <span className="font-bold text-primary">Sifra</span> - Privacy
                Policy
              </Typography>
            </div>
            <div className="w-full max-w-[140px] sm:max-w-[200px]">
              <GeminiLogo />
            </div>
          </div>
          <div className="flex flex-col gap-8 mt-4 text-white/80">
            <p>
              Welcome to Sifra AI Assistant ("Sifra," "we," "our," or "us").
              This Privacy Policy describes how we collect, use, and disclose
              information about you through
              <Link
                className="underline text-secondary"
                to={"https://sifra.swoyam.in"}
              >
                Our Website
              </Link>{" "}
              (the "Site"), and any related services provided by Sifra
              (collectively, the "Services").
            </p>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                1. Information We Collect
              </Typography>

              <ul className="list-inside list-disc flex flex-col gap-4">
                <li>
                  <span className="font-bold text-white">
                    Personal Information :
                  </span>{" "}
                  When you use our Services, we may collect certain personal
                  information such as your full name, email address.
                </li>
                <li>
                  <span className="font-bold text-white">Usage Data : </span> We
                  may collect information about your use of the Services,
                  including language preferences, referring pages, your
                  conversation with sifra and other technical information.
                </li>
                <li>
                  <span className="font-bold text-white">Cookies :</span> We use
                  cookies and similar technologies to ease your activity on our
                  Site and hold certain information.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                2. Use of Information
              </Typography>
              <p>
                We may use the information we collect for various purposes,
                including:
              </p>
              <ul className="list-inside list-disc flex flex-col gap-4">
                <li>To provide, operate, and maintain our Services.</li>
                <li>To improve, personalize, and expand our Services.</li>
                <li>To understand and analyze how you use our Services.</li>
                <li>
                  To communicate with you, regarding the use of our service
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                3. Sharing of Information
              </Typography>
              <p>
                We do not sell, trade, or otherwise transfer to outside parties
                your personally identifiable information. This does not include
                trusted third parties who assist us in operating our service,
                conducting our business, or servicing you, as long as those
                parties agree to keep this information confidential.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                4. Security
              </Typography>
              <p>
                We implement reasonable security measures to maintain the safety
                of your personal information when you enter, submit, or access
                your personal information. All your private information are
                end-to-end encrypted.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                5. Your Rights
              </Typography>
              <p>
                You have the right to access personal information we hold about
                you and to ask that your personal information be corrected,
                updated, or deleted. If you would like to exercise this right,
                please contact us using the contact information provided below
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                6. Changes to This Privacy Policy
              </Typography>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page. You are advised to review this Privacy Policy
                periodically for any changes.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                7. Contact Us
              </Typography>
              <p>
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <ul className="list-inside list-disc">
                <li>Email: me@swoyam.in</li>
                <li>Phone: +91-7608086659</li>
              </ul>
            </div>
          </div>
        </div>
      </Wrapper>
      <div className="w-full py-6 to-black1 mt-12">
        <div className="flex flex-row items-center gap-4 mx-auto max-w-max">
          <Link
            className="hover:text-secondary hover:underline transition-all ease-in-out duration-300"
            to={RouterData.termsAndCondition}
            onClick={() => {
              scroll.scrollToTop();
            }}
          >
            Terms and Conditions
          </Link>
          <Link
            className="hover:text-secondary hover:underline transition-all ease-in-out duration-300"
            to={RouterData.privacyPolicy}
            onClick={() => {
              scroll.scrollToTop();
            }}
          >
            Privacy policy{" "}
          </Link>
        </div>
        <Typography
          variant="small"
          className="text-white font-primary text-center mt-6"
        >
          {new Date().getFullYear()} @ Sifra. All rights reserved.
        </Typography>
      </div>
    </>
  );
};

export default PrivacyPolicy;
