function SampleText(textResponse, number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    text: {
      body: textResponse,
    },
    type: "text",
  });
  return data;
}

function SampleImage(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "image",
    image: {
      link: "https://biostoragecloud.blob.core.windows.net/resource-udemy-whatsapp-node/image_whatsapp.png",
    },
  });
  return data;
}

function SampleAudio(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "audio",
    audio: {
      link: "https://biostoragecloud.blob.core.windows.net/resource-udemy-whatsapp-node/audio_whatsapp.mp3",
    },
  });
  return data;
}

function SampleVideo(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "video",
    video: {
      link: "https://biostoragecloud.blob.core.windows.net/resource-udemy-whatsapp-node/video_whatsapp.mp4",
    },
  });
  return data;
}

function SampleDocument(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "document",
    document: {
      link: "https://biostoragecloud.blob.core.windows.net/resource-udemy-whatsapp-node/document_whatsapp.pdf",
    },
  });
  return data;
}

function SampleButtons(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: "Confirm your order",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "001",
              title: "Sucessfull",
            },
          },
          {
            type: "reply",
            reply: {
              id: "002",
              title: "Order Pending",
            },
          },
        ],
      },
    },
  });
  return data;
}

function SampleLists(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Hello Whatsapp User",
      },
      body: {
        text: "WhatsApp Application",
      },
      footer: {
        text: "Web Cloud Api",
      },
      action: {
        button: "Different Options",
        sections: [
          {
            title: "First",
            rows: [
              {
                id: "001",
                title: "WhatsApp User 1",
                description: "Information 1",
              },
              {
                id: "002",
                title: "WhatsApp User 2",
                description: "Information 2",
              },
            ],
          },
          {
            title: "Second",
            rows: [
              {
                id: "021",
                title: "WhatsApp User 21",
                description: "Information 21",
              },
              {
                id: "022",
                title: "WhatsApp User 22",
                description: "Information 22",
              },
            ],
          },
        ],
      },
    },
  });
  return data;
}

function SampleLocation(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "location",
    location: {
      latitude: "27.59998069",
      longitude: "78.05000565",
      name: "Uttar Pradesh",
      address: "Uttar Pradesh India",
    },
  });
  return data;
}

module.exports = {
  SampleText,
  SampleImage,
  SampleAudio,
  SampleVideo,
  SampleDocument,
  SampleButtons,
  SampleLists,
  SampleLocation,
};
