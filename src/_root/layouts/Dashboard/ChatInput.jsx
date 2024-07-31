import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
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
import { parseISO, format } from "date-fns";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const token = Cookies.get("token");
  const notificationSound = useRef(new Audio(messageSound));

  const userData = useSelector((state) => state.main.userData);

  useEffect(() => {
    inputRef.current?.focus();
    getChats();
    return () => {
      notificationSound.current.pause();
      notificationSound.current.currentTime = 0;
    };
  }, []);

  const parseObject = useCallback((str) => {
    const objects = str.match(/\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}/g);
    if (!objects) return [];

    return objects
      .map((obj) => {
        const userTypeMatch = obj.match(/'userType':\s*(\d+)/);
        const dateMatch = obj.match(/'date':\s*'([^']+)'/);
        const timeMatch = obj.match(
          /'time':\s*{\s*'date':\s*'([^']+)',\s*'time':\s*'([^']+)'\s*}/
        );
        const messageMatch = obj.match(
          /'message':\s*'([^']*)'|'message':\s*"([^"]*)"/
        );

        if (userTypeMatch && dateMatch && timeMatch && messageMatch) {
          return {
            userType: parseInt(userTypeMatch[1]),
            time: {
              date: dateMatch[1],
              time: timeMatch[2],
            },
            message: (messageMatch[1] || messageMatch[2]).replace(/\\n/g, "\n"),
          };
        }
        return null;
      })
      .filter(Boolean);
  }, []);

  const groupMessagesByDate = useMemo(
    () => (messages) => {
      const groups = {};
      messages.forEach((message) => {
        const [day, month, year] = message.time.date.split("-");
        const isoDateString = `${year}-${month}-${day}`;
        const messageDate = parseISO(isoDateString);

        if (isNaN(messageDate.getTime())) {
          console.error(
            `Invalid date format for message: ${message.time.date}`
          );
          return;
        }

        const formattedDate = format(messageDate, "MMMM d, yyyy");
        if (!groups[formattedDate]) {
          groups[formattedDate] = [];
        }
        groups[formattedDate].push(message);
      });

      return Object.entries(groups);
    },
    []
  );

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  const getChats = useCallback(async () => {
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

      const result = parseObject(res.data);
      setChatHistory(result.reverse());
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setIsLoading(false);
      setTimeout(scrollToBottom, 0);
    }
  }, [token, parseObject, scrollToBottom]);

  useEffect(() => {
    if (chatHistory.length > 0 && !isLoading) {
      scrollToBottom();
    }
  }, [chatHistory, isLoading, scrollToBottom]);

  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      if (!message || isAiTyping) return;

      const now = new Date();
      const messageTime = now.toTimeString().slice(0, 5);
      const messageDate = now.toLocaleDateString("en-GB").replace(/\//g, "-");

      const newUserMessage = {
        userType: 0,
        message,
        time: {
          date: messageDate,
          time: messageTime,
        },
      };

      setChatHistory((prev) => [...prev, newUserMessage]);
      setMessage("");
      setIsAiTyping(true);
      scrollToBottom();

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
          userType: 1,
          message: res.data.response,
          time: {
            date: messageDate,
            time: messageTime,
          },
        };

        setChatHistory((prev) => [...prev, newAiMessage]);
        notificationSound.current.play();
        scrollToBottom();
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setIsAiTyping(false);
      }
    },
    [message, isAiTyping, token, scrollToBottom]
  );

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSendMessage(e);
      }
    },
    [handleSendMessage]
  );

  const renderChatMessages = useMemo(() => {
    return groupMessagesByDate(chatHistory).map(([date, messages]) => (
      <React.Fragment key={date}>
        <div className="bg-black2 py-2 px-4 text-center">
          <span className="text-xs text-white/60">{date}</span>
        </div>
        {messages.map((chat, index) => (
          <div
            key={index}
            className={`flex ${
              chat.userType === 0
                ? "user-message justify-end pl-4"
                : "ai-message justify-start my-4 mt-8 pr-4"
            }`}
          >
            <div
              className={`flex items-center gap-1 ${
                chat.userType === 0 ? "flex-row-reverse" : "order-1"
              }`}
            >
              {chat.userType === 0 ? (
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
                  chat.userType === 0 ? "mt-10" : ""
                }`}
              >
                <span
                  className={`text-xs font-primary text-white/60 ${
                    chat.userType === 0
                      ? "text-right items-end"
                      : "text-left items-start"
                  }`}
                >
                  {chat.userType === 0 ? "You" : "Sifra"} -{" "}
                  {chat.time.time.slice(0, 5)}
                </span>
                <div
                  className={`rounded-2xl w-full max-w-max ${
                    chat.userType === 0
                      ? "bg-white/10 px-3 py-2 !rounded-se-none text-right ml-auto"
                      : "text-left pr-6"
                  }`}
                >
                  {chat.message.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i !== chat.message.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    ));
  }, [chatHistory, groupMessagesByDate, userData]);

  return (
    <Wrapper>
      <div className="chat-container h-[calc(100dvh_-_80px)] flex gap-4 flex-col bg-black2 relative">
        <div
          ref={chatContainerRef}
          className="chat-history flex-1 overflow-hidden overflow-y-auto p-2 rounded-lg shadow-sm relative border border-white/10"
        >
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
            renderChatMessages
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
        </div>
        <form
          className="chat-input w-full rounded-md mb-4 flex items-center gap-2 shadow-sm"
          onSubmit={handleSendMessage}
        >
          <Input
            placeholder="Type a message..."
            className="flex-1"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyPress={handleKeyPress}
            disabled={isAiTyping}
            ref={inputRef}
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

export default React.memo(ChatInput);
