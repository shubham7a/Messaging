import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import ChatHeader from "./ChatHeader";
import { io } from "socket.io-client";
import Hello_World from "./Hello_World";
import Interactive from "./Interactive";
import Template from "./Template";
import MobileTemplate from "./MobileTemplate";
import FlowTemplate from "./FlowTemplate";
import FlowResponse from "./FlowResponse";

const ChatWindow = ({ currentChat }) => {
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const socket = useMemo(() => io("http://localhost:4000/"), []);

  const sendMessage = async () => {
    if (newMessage.trim() && currentChat) {
      // Append the new message to the current chat
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

      if (newMessage.number && typeof newMessage.number === "string") {
        const chatId = newMessage.number.slice(2); // Remove country code
        setMessages((prev) => ({
          ...prev,
          [chatId]: [
            ...(prev[chatId] || []),
            { ...newMessage, read: newMessage.read || false }, // Default read status to false
          ],
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
                className={`p-3 my-2 rounded-lg max-w-[55%] break-words whitespace-pre-line leading-relaxed ${
                  msg.sender === "user"
                    ? "ml-auto bg-green-400 text-white"
                    : "mr-auto bg-white text-black"
                }`}
                style={{ width: "fit-content" }}
              >
                {msg.type === "text" && msg.text}
                {msg.response2 === "flow" &&
                  msg.sender === "whatsapp-message" && (
                    <FlowResponse message={msg.response1} />
                  )}
                {msg.type === "interactive" &&
                  msg.sender === "whatsapp-message" &&
                  msg.text}
                {msg.type === "interactive" && msg.sender === "user" && (
                  <Interactive
                    button1={msg.button_1}
                    button2={msg.button_2}
                    text={msg.interactiveText}
                  />
                )}
                {msg.type === "template" && msg.text === "hello_world" && (
                  <Hello_World />
                )}
                {msg.type === "template" && msg.text === "mobile" && (
                  <MobileTemplate image={msg.templateimage} />
                )}

                {msg.type === "image" && <Template image={msg.image} />}
                {msg.type === "audio" && (
                  <audio controls>
                    <source src={msg.audio} type="audio/mpeg" />
                  </audio>
                )}
                {msg.type === "template" && msg.text === "trai" && (
                  <FlowTemplate image={msg.templateimage} />
                )}
                <br />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-black ">
                    {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {msg.sender === "user" && (
                    <span
                      className={`text-sm ${
                        msg.read ? "text-blue-500" : "text-gray-400"
                      }`}
                    >
                      ✔✔
                    </span>
                  )}
                </div>
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
