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
      <h4>Flow Response</h4>
      <pre>{JSON.stringify(parsedMessage, null, 2)}</pre>
    </div>
  );
};

export default FlowResponse;
