import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../../../utils/constant";
import { Input } from "../../../components/Input";
import { PrimaryBtn } from "../../../components/Button";
import { RiSendPlane2Line } from "react-icons/ri";
import Wrapper from "../../components/Wrapper";
import { useSelector } from "react-redux";
import Gravatar from "react-gravatar";
import Lottie from "lottie-react";
import loader from "../../../data/animation/loader2.json";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const token = Cookies.get("token");

  const userData = useSelector((state) => state.main.userData);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;

    setChatHistory((prev) => [...prev, { sender: "user", message }]);

    setMessage("");
    setIsTyping(true);

    try {
      const res = await axios.post(
        `${API_URL}/chat`,
        { data: message },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", message: res.data.response },
      ]);

      setIsTyping(false);
    } catch (error) {
      console.error(error);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(e);
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isTyping]);

  return (
    <Wrapper>
      <div className="chat-container   h-[calc(100dvh_-_80px)] flex gap-4  flex-col  bg-black2">
        <div className="chat-history flex-1 overflow-hidden overflow-y-auto p-2 rounded-lg shadow-sm relative border border-white/10">
          {chatHistory.length === 0 ? (
            <div className="flex items-center justify-center h-full text-white/60">
              No messages yet. Start the conversation!
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.sender === "user"
                    ? "user-message justify-end"
                    : "ai-message justify-start my-4"
                } `}
              >
                <div
                  className={` flex items-center gap-1
                ${chat.sender === "user" ? "flex-row-reverse" : "order-1"}
                `}
                >
                  {chat.sender === "user" ? (
                    <div className="size-[50px] grid place-content-center">
                      <Gravatar
                        email={userData?.email}
                        size={30}
                        className="rounded-full border-2 border-white"
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <Lottie
                        animationData={loader}
                        loop={true}
                        className="size-[50px] relative z-10"
                      />
                    </div>
                  )}
                  <div
                    className={`flex flex-col gap-[0.25rem] ${
                      chat.sender === "user" ? "mt-10" : ""
                    }`}
                  >
                    <span
                      className={`text-xs font-primary text-white/60 ${
                        chat.sender === "user"
                          ? "text-right items-end"
                          : "text-left items-start"
                      }`}
                    >
                      {chat.sender === "user" ? "You" : "Sifra"}
                    </span>
                    <div
                      className={`rounded-2xl  ${
                        chat.sender === "user"
                          ? "bg-white/10 px-3 py-2 !rounded-se-none text-right"
                          : "text-left pr-6"
                      }`}
                    >
                      {chat.message}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="size-[80px] bg-primary blur-[80px]  absolute -top-4 -left-2 -z-1"></div>
          <div className="size-[80px] bg-secondary blur-[80px]  absolute -bottom-4 -right-2 -z-1"></div>

          {isTyping && (
            <div className="chat-message ai-message flex items-center gap-2 mb-2">
              <Lottie
                animationData={loader}
                loop={true}
                className="size-[50px] relative z-10"
              />
              <div className="rounded-md flex items-center gap-1">
                <span>Typing...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>
        <form
          className="chat-input w-full rounded-md mb-4  flex items-center gap-2 shadow-sm"
          onSubmit={handleSendMessage}
        >
          <Input
            placeholder="Type a message..."
            className="flex-1"
            onChange={handleInputChange}
            value={message}
            onKeyPress={handleKeyPress}
          />
          <PrimaryBtn
            className="h-10 flex items-center justify-center"
            type="submit"
          >
            <RiSendPlane2Line />
          </PrimaryBtn>
        </form>
      </div>
    </Wrapper>
  );
};

export default ChatInput;
