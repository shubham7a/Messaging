const axios = require("axios");
const { io } = require("../SocketIO/server");
const { getAsiaKolkataTime } = require("../controllers/time");

function SendMessageWhatsApp(data) {
  const url = "https://graph.facebook.com/v21.0/173000262573577/messages";

  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer EAANHvhSji6cBO8qOA1AiGi3UtIFVsOUxiJCQjCzYQ149yICHjZARAIfnSdSWRH1GvA5uoToxFx605oE0QmuCZA5yVpA4wCHQ69U57FKMwDUv6hGwzc2WSaLt7ZBfPxndJ50CDiuCRgGOn0F19dh324fDcI71GiLLJ4KWyw1WZCGrZCl0Qn2wABtgVeIIwn0QbIpo8daX0Hm5ZCpS2nktSXTFf8mLO6TBDutlG3yu3ZBjAEZD",
  };

  axios
    .post(url, data, { headers })
    .then((response) => {
      console.log("Message sent successfully:", response.data);
    })
    .catch((error) => {
      console.error(
        "Error sending message:",
        error.response ? error.response.data : error.message
      );
    });

  try {
    // Parse the original message data
    const replymessage = JSON.parse(data);
    console.log("replymessage", replymessage);
    //console.log("replymessage.type1", replymessage.template.components[0].parameters[0].image.link);
    let messageText = "Unsupported message type.";
    let imageLink = null;
    let audioLink = null;
    let button_1 = null;
    let button_2 = null;
    let interactiveText = null;
    let templateimage = null;
    // Handle different message types with null checks
    if (replymessage.type === "template") {
      messageText = replymessage.template.name;
      templateimage =
        replymessage.template.components[0].parameters[0].image.link;
    } else if (replymessage.type === "interactive") {
      interactiveText = replymessage.interactive?.body?.text || null;
      button_1 =
        replymessage.interactive?.action?.buttons?.[0]?.reply?.title || null;
      button_2 =
        replymessage.interactive?.action?.buttons?.[1]?.reply?.title || null;
      messageText = `Interactive: ${
        replymessage.interactive?.type || "unknown"
      }`;
    } else if (replymessage.type === "text") {
      messageText = replymessage.text?.body || "No text content.";
    } else if (replymessage.type === "image") {
      messageText = "Image received";
      imageLink = replymessage.image?.link || null; // Extract image link
    } else if (replymessage.type === "audio") {
      messageText = "Audio received";
      audioLink = replymessage.audio?.link || null; // Extract audio link
    }

    const uiData = {
      number: replymessage.to,
      text: messageText,
      timestamp: getAsiaKolkataTime(),
      sender: "user",
      type: replymessage.type,
      image: imageLink,
      audio: audioLink,
      button_1,
      button_2,
      interactiveText,
      templateimage,
    };

    console.log("uiData", uiData);

    // Emit the message data via Socket.IO
    io.emit("message", uiData);
    console.log("Message emitted to UI successfully.");
  } catch (error) {
    console.error("Error parsing or emitting message:", error.message);
  }
}

module.exports = { SendMessageWhatsApp };
