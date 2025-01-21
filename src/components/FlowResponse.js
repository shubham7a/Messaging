import React from "react";

const FlowResponse = ({ message }) => {
  // Parse the message if it's a string
  let parsedMessage;
  try {
    parsedMessage = typeof message === "string" ? JSON.parse(message) : message;
    //console.log("Parsed message:", parsedMessage);
  } catch (error) {
    console.error("Invalid JSON format:", error);
    parsedMessage = {};
  }
  return (
    <div>
      <h1><span className="font-bold">Email:</span> {parsedMessage.screen_0_Email_2}</h1>
      <h1><span className="font-bold">First Name:</span> {parsedMessage.screen_0_First_0}</h1>
      <h1><span className="font-bold">Last Name:</span> {parsedMessage.screen_0_Last_1}</h1>
      <h1><span className="font-bold">How did you hear about us:</span> {parsedMessage.screen_1_Choose_0.replace(/^3_/, "")}</h1>
    </div>
  );
};

export default FlowResponse;
