const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const processMessage = require("../shared/processMessage");
const whatsappService = require("../services/whatsappServices");
const sampleModels = require("../shared/sampleModels");
const whatsappModel = require("../shared/whatsappmodels");
const { io } = require("../SocketIO/server.js");
const { getAsiaKolkataTime } = require("../controllers/time");
const { type } = require("os");
const { time } = require("console");
const axios = require("axios");

require("dotenv").config();

// Verify token
const verfiToken = (req, res) => {
  try {
    const accessToken = "token";
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (challenge != null && token != null && token === accessToken) {
      res.send(challenge);
    } else {
      res.status(400).send();
    }
  } catch (error) {
    res.status(400).send();
  }
};

// Handle incoming messages
const ReceivedMessage = async (req, res) => {
  console.log("Incoming Webhook Payload:", JSON.stringify(req.body, null, 2));
  const GRAPH_API_TOKEN = process.env.ACCESS_TOKEN;
  try {
    const entry = req.body["entry"][0];
    const changes = entry["changes"][0];
    const value = changes["value"];
    const messageObject = value["messages"];

    if (messageObject) {
      const message = messageObject[0];
      const number = message["from"];
      const text = GetTextUser(message);
      const type = message["type"];
      const message_id = message["id"];
      let response1 = null;
      let response2 = null;

      if (message?.interactive?.nfm_reply) {
        response1 = message.interactive.nfm_reply.response_json;
        response2 = message.interactive.nfm_reply.name;
      }

      const newMessage = {
        number,
        text,
        type,
        response1,
        response2,
        timestamp: getAsiaKolkataTime(),
        sender: "whatsapp-message",
      };

      console.log("New message:", newMessage);
      io.emit("message", newMessage);

      if (text) {
        processMessage.Process(text, number, message_id);
      }

      // if (text) {

      //   if (
      //     type === "text" &&
      //     text.toLowerCase().includes("appointment")
      //   ) {
      //     await axios({
      //       method: "POST",
      //       url: `https://graph.facebook.com/v21.0/173000262573577/messages`,
      //       headers: {
      //         Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      //       },
      //       data: {
      //         messaging_product: "whatsapp",
      //         to: number,
      //         type: "interactive",
      //         interactive: {
      //           type: "flow",
      //           header: {
      //             type: "text",
      //             text: "Hello there 👋",
      //           },
      //           body: {
      //             text: "Ready to transform your space? Schedule a personalized consultation with our expert team!",
      //           },
      //           footer: {
      //             text: "Click the button below to proceed",
      //           },
      //           action: {
      //             name: "flow",
      //             parameters: {
      //               flow_id: "2118668205283531",
      //               flow_message_version: "3",
      //               flow_token: "Trai",
      //               flow_cta: "Book an appointment",
      //               flow_action: "data_exchange",
      //             },
      //           },
      //         },
      //       },
      //     });
      //   }

      //   if (
      //     type === "interactive" && response2 === "flow"
      //   ) {
      //     await axios({
      //       method: "POST",
      //       url: `https://graph.facebook.com/v21.0/173000262573577/messages`,
      //       headers: {
      //         Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      //       },
      //       data: {
      //         messaging_product: "whatsapp",
      //         to: number,
      //         text: { body: "You've successfully booked an appointment" },
      //       },
      //     });
      //   }

      // }

      // Send read receipt
      await axios.post(
        "https://graph.facebook.com/v21.0/173000262573577/messages",
        {
          messaging_product: "whatsapp",
          status: "read",
          message_id: message_id,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          },
        }
      );

      res.send("success");
    } else {
      res.status(400).send("No messages found in the request.");
    }
  } catch (error) {
    console.error("Error in ReceivedMessage:", error);
    res.status(500).send("Internal server error");
  }
};

// Send a message
const sendMessage = (req, res) => {
  try {
    const { to, message } = req.body;
    const data = whatsappModel.MessageText(message, "91" + to);
    whatsappService.SendMessageWhatsApp(data);

    res.send("success");
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("error");
  }
};

// Extract text from incoming WhatsApp messages
function GetTextUser(messages) {
  let text = "";
  const typeMessage = messages["type"];

  if (typeMessage === "text") {
    text = messages["text"]["body"];
  } else if (typeMessage === "interactive") {
    const interactiveObject = messages["interactive"];
    const typeInteractive = interactiveObject["type"];

    if (typeInteractive === "button_reply") {
      text = interactiveObject["button_reply"]["title"];
    } else if (typeInteractive === "list_reply") {
      text = interactiveObject["list_reply"]["title"];
    } else {
      myConsole.log("Unsupported message type.");
    }
  }

  return text;
}

module.exports = { verfiToken, ReceivedMessage, sendMessage };
