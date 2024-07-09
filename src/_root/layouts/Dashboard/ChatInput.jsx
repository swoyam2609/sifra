import React, { useState, useEffect, useRef } from "react";
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
import messageSound from "../../../data/animation/sound.wav";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const chatEndRef = useRef(null);
  const token = Cookies.get("token");
  const notificationSound = new Audio(messageSound);

  const [isAiTyping, setIsAiTyping] = useState(false);

  const userData = useSelector((state) => state.main.userData);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  function parseObject(str) {
    const userTypeMatch = str.match(/'userType':\s*(\d+)/);
    const timeMatch = str.match(/'time':\s*datetime\.datetime\(([^)]+)\)/);
    const messageMatch = str.match(/'message':\s*(.+)(?=\})/s);

    if (userTypeMatch && timeMatch && messageMatch) {
      const [year, month, day, hour, minute, second, microsecond] = timeMatch[1]
        .split(",")
        .map((num) => parseInt(num.trim()));
      const date = new Date(
        year,
        month - 1,
        day,
        hour,
        minute,
        second,
        microsecond / 1000
      );

      return {
        userType: parseInt(userTypeMatch[1]),
        time: date.toISOString(),
        message: messageMatch[1]
          .trim()
          .replace(/^['"]|['"]$/g, "")
          .replace(/\\n/g, "\n"),
      };
    }
    return null;
  }

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach((message) => {
      const date = new Date(message.time).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return Object.entries(groups);
  };

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  const getChats = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/getchats`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;

      console.log(data);

      const objectStrings = data.match(/\{[^}]+\}/g) || [];
      const result = objectStrings.map(parseObject).filter(Boolean);

      // Sort messages by date
      const sortedChats = result.sort(
        (a, b) => new Date(a.time) - new Date(b.time)
      );

      console.log(sortedChats);

      setChatHistory(
        sortedChats.map((chat) => ({
          sender: chat.userType === 0 ? "user" : "ai",
          message: chat.message,
          time: chat.time,
        }))
      );

      // Call scrollToBottom after setting chat history
      setTimeout(scrollToBottom, 0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0 && !isLoading) {
      scrollToBottom();
    }
  }, [chatHistory, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message || isAiTyping) return;

    const newUserMessage = {
      sender: "user",
      message: message,
      time: new Date().toISOString(),
    };

    setChatHistory((prev) => [...prev, newUserMessage]);

    setMessage("");
    setIsAiTyping(true);

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

      const newAiMessage = {
        sender: "ai",
        message: res.data.response,
        time: new Date().toISOString(),
      };

      setChatHistory((prev) => [...prev, newAiMessage]);

      setIsAiTyping(false);
      notificationSound.play(); // Play the sound when AI response is received
    } catch (error) {
      console.log(error);
      setIsAiTyping(false);
    }
  };

  useEffect(() => {
    return () => {
      notificationSound.pause();
      notificationSound.currentTime = 0;
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(e);
    }
  };

  if (chatEndRef.current) {
    chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToBottom();
    // Set a short timeout to ensure scrolling happens after render
    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId);
  }, [chatHistory, isAiTyping]);

  return (
    <Wrapper>
      <div className="chat-container h-[calc(100dvh_-_80px)] flex gap-4 flex-col bg-black2 relative">
        <div className="chat-history flex-1 overflow-hidden overflow-y-auto p-2 rounded-lg shadow-sm relative border border-white/10">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Lottie
                animationData={loader}
                loop={true}
                className="size-[100px]"
              />
            </div>
          ) : chatHistory.length === 0 ? (
            <div className="flex items-center justify-center h-full text-white/60 text-center">
              No messages yet. Start the conversation!
            </div>
          ) : (
            groupMessagesByDate(chatHistory).map(([date, messages]) => (
              <React.Fragment key={date}>
                <div className=" bg-black2 py-2 px-4 text-center">
                  <span className="text-xs text-white/60">{date}</span>
                </div>
                {messages.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex  ${
                      chat.sender === "user"
                        ? "user-message justify-end pl-4"
                        : "ai-message justify-start my-4 mt-8 pr-4"
                    } `}
                  >
                    <div
                      className={`flex items-center gap-1 ${
                        chat.sender === "user" ? "flex-row-reverse" : "order-1"
                      }`}
                    >
                      {chat.sender === "user" ? (
                        <div className="size-[50px] grid place-content-center">
                          {userData?.email && (
                            <Gravatar
                              email={userData.email}
                              size={30}
                              className="rounded-full border-2 border-white"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="relative">
                          <Lottie
                            animationData={loader}
                            loop={false}
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
                          className={`rounded-2xl ${
                            chat.sender === "user"
                              ? "bg-white/10 px-3 py-2 !rounded-se-none text-right"
                              : "text-left pr-6"
                          }`}
                        >
                          {chat.message.split("\n").map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              {i !== chat.message.split("\n").length - 1 && (
                                <br />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))
          )}
          <div className="size-[80px] bg-primary blur-[80px] fixed -top-4 -left-2 -z-1"></div>
          <div className="size-[80px] bg-secondary blur-[80px] fixed -bottom-4 -right-2 -z-1"></div>
          {isAiTyping && (
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
          className="chat-input w-full rounded-md mb-4 flex items-center gap-2 shadow-sm"
          onSubmit={handleSendMessage}
        >
          <Input
            placeholder="Type a message..."
            className="flex-1"
            onChange={handleInputChange}
            value={message}
            onKeyPress={handleKeyPress}
            disabled={isAiTyping}
          />
          <PrimaryBtn
            className="h-10 flex items-center justify-center"
            type="submit"
            disabled={isAiTyping}
          >
            {isAiTyping ? (
              <Lottie
                animationData={loader}
                loop={true}
                className="size-[24px]"
              />
            ) : (
              <RiSendPlane2Line />
            )}
          </PrimaryBtn>
        </form>
      </div>
    </Wrapper>
  );
};

export default ChatInput;
