import { useEffect, useState, useRef } from "react";
import { getClubMessages } from "../services/chatService";
import socket from "../socket";
import { useAuth } from "../context/AuthContext";

function ChatSection({ clubId }) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const userId = user?._id?.toString();

  const fetchMessages = async () => {
    try {
      const data = await getClubMessages(clubId);
      setMessages(data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [clubId]);

  useEffect(() => {
    socket.emit("join_club", clubId);
  }, [clubId]);

  useEffect(() => {
    const handleReceive = (newMessage) => {
      setMessages((prev) => {
        const exists = prev.some((msg) => msg._id === newMessage._id);
        if (exists) return prev;
        return [...prev, newMessage];
      });
    };
    socket.on("receive_message", handleReceive);
    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send_message", {
      text: message,
      sender: user._id,
      club: clubId
    });
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const isOwnMessage = (msg) => {
    const senderId = msg.sender?._id?.toString() || msg.sender?.toString();
    return senderId === userId;
  };

  return (
    <div className="mt-12 text-white!">
      <h2 className="text-2xl font-bold text-red-100 tracking-tight flex items-center gap-2 mb-6">
        <span className="w-1.5 h-6 bg-red-800 rounded-full"></span>
        Discussions
      </h2>
      <div
        ref={chatContainerRef}
        className="bg-[#120a0a]! border border-red-900/40 rounded-2xl p-5 h-[400px] overflow-y-auto shadow-inner"
      >
        {messages.length === 0 ? (
          <p className="text-gray-600 text-sm italic text-center mt-20">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg) => {
            const own = isOwnMessage(msg);
            return (
              <div
                key={msg._id || `${msg.sender}-${msg.createdAt}-${msg.text}`}
                className={`mb-4 p-4 rounded-xl max-w-[85%] transition-all ${
                  own
                    ? "ml-auto bg-red-900/40 border border-red-700/40"
                    : "mr-auto bg-[#1e1414] border border-red-900/20"
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-1">
                  <p className={`font-bold text-sm ${own ? "text-red-300" : "text-gray-300"}`}>
                    {own ? "You" : msg.sender?.name || "Member"}
                  </p>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-gray-100 break-words text-sm leading-relaxed">
                  {msg.text}
                </p>
              </div>
            );
          })
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="flex gap-3 mt-5">
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-3 rounded-xl bg-[#1e1414]! border border-red-900/50 text-white! placeholder-gray-500! outline-none focus:border-red-700/80 transition-all text-sm shadow-md"
        />
        <button
          onClick={sendMessage}
          className="bg-red-900/60 hover:bg-red-800/70 border border-red-800/40 text-red-100 font-semibold px-6 rounded-xl text-sm shadow-md transition-all duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatSection;
