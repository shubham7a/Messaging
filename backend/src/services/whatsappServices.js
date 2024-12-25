// const https = require("https");
// const { type } = require("os");
const axios = require("axios");
const { json } = require("express");
const { io } = require("../SocketIO/server");
const { getAsiaKolkataTime } = require("../controllers/time");
function SendMessageWhatsApp(data) {
  // const options = {
  //     host: "graph.facebook.com",
  //     path: "/v21.0/173000262573577/messages",
  //     method: "POST",
  //     body: data,
  //     headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": "Bearer EAANHvhSji6cBOw8RvdlD0ft3u7PqnZChM8XghhB31ohTBk9WZCkOa44xbLZBzgv5eFL5R1DIHkWGkTf2rR2yiwMLroZCBMSdiDi3dIOfqNHbgdyydFmYShGjPSbcAtCon1osKsNqQZCLAtjEs9jPSHb7rf7ZA1uLq9rwLkFWbIEYYYkQJA38za6Se7giYDpdA4yt2pZAIWE4z1ZCgPS3uAhfpxxrrkHiBdGZChmMANsuLgV8E7gZDZD",
  //     }
  // };

  // const req = https.request(options, (res) => {
  //     res.on("data", (d) => {
  //         process.stdout.write(d);
  //     });
  // });

  // req.on("error", (error) => {
  //     console.error(error);
  // });

  // req.write(data);
  // req.end();

  const url = "https://graph.facebook.com/v21.0/173000262573577/messages";

  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer EAANHvhSji6cBOzOEGhxdkJh8kHMs9R9lXaOyKdwiIJ5F0lMqj3riKGI4ZBE9EVuTMoM3wOte099kSVrNqI2HJstErlGVmKRGgGQhYWQa3uLVDUxHcb2D5eZAoZAVWHvWL3I8zi8kC2ZBiSGj5EAFVRNVS1qufs6C7hzZAdLZBfdRH2oXf0dTHREqZACIDc1X44KQJPo3NEafoMdGIkWIARJs3kp8Iasu0DH0ZBcbK58uo3sZD",
  };
  axios
    .post(url, data, { headers })
    .then((response) => {
      console.log("Message sent server say hai  successfully:", response.data);
      
    })
    .catch((error) => {
      console.error(
        "Error sending message:",
        error.response ? error.response.data : error.message
      );
    });

  // const replymessage=JSON.parse(data);
  // console.log("replymessage",replymessage);
  //  const data1={
  //    number:replymessage.to,
  //    text:replymessage.text.body,
  //    timestamp: getAsiaKolkataTime(),
  //    sender:"user"
  //  }
  //  io.emit("message", data1 );
  //  console.log("Message sent server Thik hai Bhaiya");

    // Parse the original message data
    const replymessage = JSON.parse(data);

    // Handle the UI data for a template message
    let messageText;
    if (replymessage.type === "template") {
      messageText = `Template: ${replymessage.template.name}`;
    }
    else if(replymessage.type === "interactive")
      {
        messageText = `Interactive: ${replymessage.interactive.type}`
      } else if (replymessage.text) {
      messageText = replymessage.text.body;
    } else {
      messageText = "Unsupported message type.";
    }

    const uiData = {
      number: replymessage.to,
      text: messageText,
      timestamp: getAsiaKolkataTime(),
      sender: "user",
    };

    // Emit the message data via Socket.IO
    io.emit("message", uiData);
    console.log("Message emitted to UI successfully.");

}

module.exports = { SendMessageWhatsApp };
