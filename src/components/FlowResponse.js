import React from 'react';

const FlowResponse = ({ message }) => {
  // Parse the message if it's a string
  let parsedMessage;
  try {
    parsedMessage = typeof message === 'string' ? JSON.parse(message) : message;
  } catch (error) {
    console.error("Invalid JSON format:", error);
    parsedMessage = {};
  }
  return (
    <div>
      <h1>Email: {parsedMessage.screen_1_Email_0}</h1>
      <h1>Gender: {parsedMessage.screen_0_Gender_0}</h1>
      <h1>Age: {parsedMessage.screen_0_Enter_Your_Ages_1}</h1>
      {console.log("Parsed message:", parsedMessage)}
      {console.log("Email:", parsedMessage.screen_1_Email_0)}
    </div>
  );
};

export default FlowResponse;
