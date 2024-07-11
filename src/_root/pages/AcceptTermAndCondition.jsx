/* eslint-disable react/no-unescaped-entities */
import Lottie from "lottie-react";
import loader from "../../data/animation/loader2.json";
import GeminiLogo from "../components/GeminiLogo";
import { Button, Typography } from "@material-tailwind/react";
import Wrapper from "../components/Wrapper";
import { PrimaryBtn } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { RouterData } from "../../router/RouterData";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { API_URL } from "../../utils/constant";
import axios from "axios";
import { useEffect } from "react";

const AcceptTermAndCondition = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate(RouterData.home.link);
    }

    const fetch = async () => {
      const res = await axios.get(`${API_URL}/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.data.verify) {
        navigate(RouterData.dashboard);
      }
    };
    fetch();
  }, [token]);

  const logout = () => {
    Cookies.remove("token");
    navigate(RouterData.home.link);
    toast.success("Logged out successfully", {
      duration: 4000,
      className: "text-sm font-primary",
      position: "top-center",
    });
  };

  const verify = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/user/verify`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      if (res.data) {
        navigate(RouterData.dashboard);
        toast.success("Terms and Conditions Accepted Successfully", {
          duration: 4000,
          className: "text-sm font-primary",
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong, Please Try Again Later", {
          duration: 4000,
          className: "text-sm font-primary",
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(
        error.response.data.message ||
          "Something went wrong, Please Try Again Later",
        {
          duration: 4000,
          className: "text-sm font-primary",
          position: "top-center",
        }
      );
    }
  };

  return (
    <div className="w-full min-h-dvh bg-black1">
      <Wrapper>
        <div className="flex flex-row items-center justify-between gap-6">
          <div className="flex flex-row items-center">
            <Lottie
              animationData={loader}
              loop={true}
              className="size-[60px] relative z-10"
            />
            <div className="size-[80px] bg-primary blur-[80px]  absolute -top-4 -left-2 -z-1"></div>
            <Typography
              variant="h3"
              className="font-primary text-white font-normal -ml-1"
            >
              Sifra
            </Typography>
          </div>
          <div className="w-full max-w-[140px] sm:max-w-[150px]">
            <GeminiLogo />
          </div>
        </div>
        <Typography
          variant="h2"
          className="text-white font-primary font-normal text-2xl w-full max-w-[500px] my-4"
        >
          Terms and Conditions
        </Typography>
        <div className=" w-full px-6 h-[calc(100dvh_-_230px)] overflow-y-scroll scrollShow">
          <div className="flex flex-col gap-8 mt-4 text-white/80">
            <p>
              Welcome to Sifra AI Assistant ("Sifra," "we," "our," or "us").
              These Terms and Conditions ("Terms") govern your access to and use
              of{" "}
              <Link
                className="underline text-secondary"
                to={"https://sifra.swoyam.in"}
              >
                Our Website
              </Link>{" "}
              (the "Site"), and any related services provided by Sifra
              (collectively, the "Services"). Please read these Terms carefully
              before using the Services.
            </p>
            <p>
              By accessing or using the Services, you agree to be bound by these
              Terms. If you do not agree with these Terms, please do not use the
              Services.
            </p>

            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                1. Acceptance of Terms
              </Typography>
              <p>
                By using the Services, you affirm that you are at least 18 years
                old, or if you are under 18, you have obtained parental or
                guardian consent to use the Services. If you are using the
                Services on behalf of an entity, you represent and warrant that
                you have the authority to bind that entity to these Terms.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                2. Changes to Terms
              </Typography>
              <p>
                We may modify these Terms at any time. Any changes will be
                effective immediately upon posting on the Site. Your continued
                use of the Services after any such changes constitutes your
                acceptance of the new Terms. We encourage you to review these
                Terms periodically
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                3. Privacy Policy
              </Typography>
              <p>
                Your use of the Services is also governed by our Privacy Policy,
                which describes how we collect, use, and disclose your personal
                information. The Privacy Policy can be found{" "}
                <Link
                  className="text-secondary underline"
                  to={RouterData.privacyPolicy}
                >
                  Here
                </Link>{" "}
                .
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                4. User Accounts
              </Typography>
              <p>
                To access certain features of the Services, you may be required
                to create an account. You agree to provide accurate and complete
                information when creating your account and to update such
                information as necessary. You are responsible for maintaining
                the confidentiality of your account credentials and for all
                activities that occur under your account.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                5. Use of Services
              </Typography>
              <p>
                You agree to use the Services only for lawful purposes and in
                accordance with these Terms. You agree not to:
              </p>
              <ul className="list-inside list-disc flex flex-col gap-4">
                <li>
                  Use the Services in any way that violates any applicable
                  local, state, national, or international law or regulation.
                </li>
                <li>
                  Use the Services for the purpose of exploiting, harming, or
                  attempting to exploit or harm sifra or any other user in any
                  way.
                </li>
                <li>
                  Transmit, or procure the sending of, any advertising or
                  promotional material without our prior written consent.
                </li>
                <li>
                  Impersonate or attempt to impersonate Sifra, a Sifra employee,
                  another user, or any other person or entity.
                </li>
                <li>
                  Engage in any other conduct that restricts or inhibits
                  anyone's use or enjoyment of the Services, or which, as
                  determined by us, may harm Sifra or users of the Services.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                6. Intellectual Property
              </Typography>
              <p>
                The Services and their entire contents, features, and
                functionality (including but not limited to all information,
                software, text, displays, images, video, and audio, and the
                design, selection, and arrangement thereof) are owned by Sifra,
                its licensors, or other providers of such material and are
                protected by copyright, trademark, patent, trade secret, and
                other intellectual property or proprietary rights laws.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                7. User Content
              </Typography>
              <p>
                If you submit or post content on the Site (including but not
                limited to text, photographs, graphics, or other material)
                ("User Content"), you grant Sifra a non-exclusive, royalty-free,
                worldwide, irrevocable, and sublicensable license to use,
                reproduce, modify, perform, display, distribute, and otherwise
                disclose to third parties any such material for any purpose.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                8. Third-Party Links
              </Typography>
              <p>
                The Services may contain links to third-party websites or
                resources. These links are provided for your convenience only.
                Sifra has no control over the contents of those sites or
                resources and accepts no responsibility for them or for any loss
                or damage that may arise from your use of them.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                9. Disclaimers and Limitation of Liability
              </Typography>
              <p>
                The Services are provided on an "AS IS" and "AS AVAILABLE"
                basis, without any warranties of any kind, either express or
                implied. Sifra does not warrant that the Services will be
                uninterrupted, error-free, or free of viruses or other harmful
                components.
              </p>
              <p>
                In no event will Sifra, its affiliates, or their licensors
                ,employees, agents, officers, or directors be liable for damages
                of any kind, under any legal theory, arising out of or in
                connection with your use, or inability to use, the Services,
                including any direct, indirect, incidental, special,
                consequential, or punitive damages, including but not limited to
                personal injury, pain and suffering, emotional distress, loss of
                revenue, loss of profits, loss of business, loss of data, and
                whether caused by tort (including negligence), breach of
                contract, or otherwise, even if foreseeable.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                10. Indemnification
              </Typography>
              <p>
                You agree to defend, indemnify, and hold harmless Sifra, its
                affiliates, licensors, and service providers, and its and their
                respective officers, directors, employees, agents, licensors,
                suppliers, successors, and assigns from and against any claims,
                liabilities, damages, judgments, awards, losses, costs,
                expenses, or fees (including reasonable attorneys' fees) arising
                out of or relating to your violation of these Terms or your use
                of the Services, including, but not limited to, your User
                Content, any use of the Site’s content, services, Sifra - Terms
                and Condition 4 and products other than as expressly authorized
                in these Terms, or your use of any information obtained from the
                Services.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                11. Termination
              </Typography>
              <p>
                We may terminate or suspend your access to all or part of the
                Services, without notice, for any conduct that we, in our sole
                discretion, believe is in violation of any applicable law or is
                harmful to the interests of another user, a third party, or
                Sifra. Upon termination, your right to use the Services will
                immediately cease, and we may deactivate or delete your account
                and all related information.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                12. Governing Law and Dispute Resolution
              </Typography>
              <p>
                These Terms are governed by and construed in accordance with the
                laws of India without regard to its conflict of law principles.
                You agree to submit to the exclusive jurisdiction of the courts
                located within India to resolve any legal matter arising from
                these Terms or the Services. Any disputes arising under these
                Terms or relating to the Services will be resolved through
                binding arbitration conducted by courts in India, and you
                consent to personal jurisdiction and venue in India.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                13. Severability
              </Typography>
              <p>
                If any provision of these Terms is found to be invalid or
                unenforceable by any court of competent jurisdiction, such
                invalidity or unenforceability will not affect the remaining
                provisions of these Terms, which will remain in full force and
                effect.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                14. Entire Agreement
              </Typography>
              <p>
                These Terms and our Privacy Policy constitute the sole and
                entire agreement between you and Sifra regarding the Services,
                and they supersede all prior and contemporaneous understandings,
                agreements, representations, and warranties, both written and
                oral, regarding the Services. If any provision of these Terms is
                found to be invalid or unenforceable by any court of competent
                jurisdiction, such invalidity or unenforceability will not
                affect the remaining provisions of these Terms, which will
                remain in full force and effect.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                15. Waiver
              </Typography>
              <p>
                No waiver by Sifra of any term or condition set forth in these
                Terms will be deemed a further or continuing waiver of such term
                or condition or a waiver of any other term or condition, and any
                failure of Sifra to assert a right or provision under these
                Terms will not constitute a waiver of such right or provision.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Typography
                variant="h6"
                className="text-white font-primary font-normal text-3xl"
              >
                16. Contact Information
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
        <div className="mt-4 ml-auto flex flex-row items-center justify-end gap-4">
          <Button
            className=" font-primary text-red-500 border-2 border-red-500 bg-red-500/10"
            size="lg"
            onClick={logout}
          >
            <span>Decline</span>
          </Button>
          <PrimaryBtn onClick={verify}>
            <span>Accept</span>
          </PrimaryBtn>
        </div>
      </Wrapper>
    </div>
  );
};

export default AcceptTermAndCondition;
