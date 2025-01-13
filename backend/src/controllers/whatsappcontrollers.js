// const fs = require("fs");
// const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
// const processMessage = require("../shared/processMessage");
// const whatsappService = require("../services/whatsappServices");
// const sampleModels = require("../shared/sampleModels");
// const { send } = require("process");
// const {io} = require("../SocketIO/server.js");

// const hello = [];
// const verfiToken = (req, res) => {
//   try {
//     var accessToken = "token";
//     var token = req.query["hub.verify_token"];
//     var challenge = req.query["hub.challenge"];

//     if (challenge != null && token != null && token == accessToken) {
//       res.send(challenge);
//     } else {
//       res.status(400).send();
//     }
//   } catch (error) {
//     res.ststus(400).send();
//   }
// };

// const ReceivedMessage = (req, res) => {
//   // console.log(
//   //     "Incoming Webhook Payload:",
//   //     JSON.stringify(req.body, null, 2)
//   //   );

//   var entry = req.body["entry"][0];
//   var changes = entry["changes"][0];

//   try {
//     var value = changes["value"];
//     var messageObject = value["messages"];

//     if (typeof messageObject != "undefined") {
//       var messages = messageObject[0];
//       var number = messages["from"];
//       var text = GetTextUser(messages);

//       if (text != "") {
//         processMessage.Process(text, number);
//         hello.push({ number, text });
//         myConsole.log(text);
//         myConsole.log(number);
//       }
//       // else if(text == "image")
//       // {
//       //     var data=samples.SampleImage(number);
//       //     whatsappService.SendMessageWhatsApp(data);
//       // }
//       // else if(text=="audio")
//       // {
//       //     var data=samples.SampleAudio(number);
//       //     whatsappService.SendMessageWhatsApp(data);
//       // }
//       // else if(text=="video")
//       // {
//       //     var data=samples.SampleVideo(number);
//       //     whatsappService.SendMessageWhatsApp(data);
//       // }
//       // else if(text=="document")
//       // {
//       //     var data=samples.SampleDocument(number);
//       //     whatsappService.SendMessageWhatsApp(data);
//       // }
//       // else if(text=="button")
//       // {
//       //     var data=samples.SampleButtons(number);
//       //     whatsappService.SendMessageWhatsApp(data);
//       // }
//       // else if(text=="list")
//       // {
//       //     var data=samples.SampleLists(number);
//       //     whatsappService.SendMessageWhatsApp(data);
//       // }
//       // else if(text=="location")
//       // {
//       //     var data=samples.SampleLocation(number);
//       //     whatsappService.SendMessageWhatsApp(data);
//       // }
//       // else
//       // {
//       //     var data=samples.SampleText("No User",number);
//       //     whatsappService.SendMessageWhatsApp(data);
//       // }
//     }

//     res.send("success");
//   } catch (error) {
//     res.send("error");
//   }
// };

// const fetchMessages = (req, res) => {
//   try {
//     const chatId = req.query.chatId; // Get chatId from query parameters
//     const newchatId = "91" + chatId;
//     if (!chatId) {
//       return res.status(400).json({ error: "chatId is required" });
//     }

//     // Filter messages specific to the chatId
//     const filteredMessages = hello.filter(
//       (message) => message.number === newchatId
//     );
//      io.emit("message", filteredMessages);
//     res.json(filteredMessages); // Return the filtered messages
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     res.status(500).send("Internal server error");
//   }
// };

// const sendMessage = (req, res) => {
//   try {
//     const { to, message } = req.body;

//     var data = sampleModels.SampleText(message, "91" + to);
//     whatsappService.SendMessageWhatsApp(data);
//     res.send("success");
//   } catch (error) {
//     res.send("error");
//   }
// };

// function GetTextUser(messages) {
//   var text = "";
//   var typeMessage = messages["type"];

//   if (typeMessage == "text") {
//     text = messages["text"]["body"];
//   } else if (typeMessage == "interactive") {
//     var interactiveObject = messages["interactive"];
//     var typeInteactive = interactiveObject["type"];

//     if (typeInteactive == "button_reply") {
//       text = interactiveObject["button_reply"]["title"];
//     } else if (typeInteactive == "list_reply") {
//       text = interactiveObject["list_reply"]["title"];
//     } else {
//       myConsole.log("Sin messages");
//     }
//   }

//   return text;
// }

// module.exports = { verfiToken, ReceivedMessage, fetchMessages, sendMessage };

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
const ReceivedMessage = async(req, res) => {
 // console.log("Incoming Webhook Payload:", JSON.stringify(req.body, null, 2));
  // try {
  //   const entry = req.body["entry"][0];
  //   const changes = entry["changes"][0];
  //   const value = changes["value"];
  //   const messageObject = value["messages"];
   
 
  //   if (messageObject) {
  //     const message = messageObject[0];
  //     const number = message["from"];
  //     const text = GetTextUser(message);
  //     const type = message["type"];
  //     let response1 = null;
  //     let response2 = null;
  //     const message_id = messageObject[0].id;
      
  //     // Safely access `nfm_reply`
  //     if (message?.interactive?.nfm_reply) {
  //       response1 = message.interactive.nfm_reply.response_json;
  //       response2 = message.interactive.nfm_reply.name;
  //       console.log("response1:", response1);
  //       console.log("response2:", response2);
  //     }
      
    
  //     const newMessage = {
  //       number,
  //       text,
  //       type: type,
  //       response1: response1,
  //       response2: response2,
  //       timestamp: getAsiaKolkataTime(),
  //       sender: "whatsapp-message",
  //     };

  //     console.log("New message:", newMessage);
  //    // console.log("Email", newMessage.response1.screen_1_Email_0);

  //     io.emit("message", newMessage);

  //     if (text) {
  //       processMessage.Process(text, number);
  //       hello.push({ number, text });

  //       // Log and emit the message via Socket.IO
  //       //myConsole.log(`Message from ${number}: ${text}`);
  //       //io.emit("message", { number, text });
  //     }
  //   }

  //   await axios({
  //     method: "POST",
  //     url: "https://graph.facebook.com/v21.0/173000262573577/messages",
  //     headers: {
  //         Authorization: "Bearer EAANHvhSji6cBOZB67AmLk4p6HPmV3fZBqKGUxFuLVkOUjoJ4KlFSZAFyfXFLXYXZCZBm7aVMhmubAlacAU7rZAsZAq0JKwLWEfztfvxkvLNB8feuAfU1CYdqd4pDwISZBTZAyuVgQRRPykuDhb41a2JxKOxKpMfUer4CTbgFZBidJR8FJGrnTZBphOPpf52HfmZAFVvrVwkNbGkW4LVx6FWBLWVyIIoA4yU9cVZCpVc1jmBp9zZCQZD",
  //     },
  //     data: {
  //         messaging_product: "whatsapp",
  //         status: "read",
  //         message_id: message_id,
  //     },
  // });

  //   res.send("success");
  // } catch (error) {
  //   console.error("Error in ReceivedMessage:", error);
  //   res.status(500).send("error");
  // }
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
        processMessage.Process(text, number);
      }

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
            Authorization:
              "Bearer EAANHvhSji6cBO8qOA1AiGi3UtIFVsOUxiJCQjCzYQ149yICHjZARAIfnSdSWRH1GvA5uoToxFx605oE0QmuCZA5yVpA4wCHQ69U57FKMwDUv6hGwzc2WSaLt7ZBfPxndJ50CDiuCRgGOn0F19dh324fDcI71GiLLJ4KWyw1WZCGrZCl0Qn2wABtgVeIIwn0QbIpo8daX0Hm5ZCpS2nktSXTFf8mLO6TBDutlG3yu3ZBjAEZD",
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
