import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import ChatHeader from "./ChatHeader";
import { io } from "socket.io-client";

const ChatWindow = ({ currentChat }) => {
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const socket = useMemo(() => io("http://localhost:4000/"), []);

  const sendMessage = async () => {
    if (newMessage.trim() && currentChat) {
      setMessages((prev) => ({
        ...prev,
        [currentChat]: [...(prev[currentChat] || [])],
      }));

      try {
        const payload = { to: currentChat, message: newMessage };
        await axios.post(
          "http://localhost:4000/whatsapp/send-messages",
          payload
        );
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setNewMessage("");
      }
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("message", (newMessage) => {
      console.log("Received message:", newMessage);

      // Check if the number exists and is a string
      if (newMessage.number && typeof newMessage.number === "string") {
        const chatId = newMessage.number.slice(2); // Remove country code
        setMessages((prev) => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), newMessage],
        }));
      } else {
        console.error(
          "Message received with missing or invalid number:",
          newMessage
        );
      }
    });

    return () => socket.disconnect();
  }, [socket]);

  const onEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  console.log("Messages", messages);

  return (
    <div className="w-[80%] flex flex-col h-full">
      {currentChat ? (
        <>
          <ChatHeader currentChat={currentChat} />
          <div className="flex-grow p-4 overflow-y-auto bg-gray-100">
            {messages[currentChat]?.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded-lg max-w-[60%] ${
                  msg.sender === "user"
                    ? "ml-auto bg-green-500 text-white"
                    : "mr-auto bg-white text-black"
                }`}
              >
                {msg.text}
                <br />
                <span className="text-sm text-black">
                  {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-200 flex items-center space-x-4">
            <input
              type="text"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow p-2 rounded border border-gray-300 focus:outline-none"
            />
            <button
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="bg-gray-300 p-2 rounded"
            >
              😊
            </button>
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>

          {showEmojiPicker && (
            <div className="absolute bottom-20 right-10">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center flex-grow text-gray-500">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
