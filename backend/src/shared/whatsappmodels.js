function MessageText(textResponse, number) {
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

function ReplyMessage(textResponse, number, message_id) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "text",
    text: {
      body: textResponse,
    },
    context: {
      message_id: message_id,
    },
  });
  return data;
}

function MessageImage(number) {
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

function MessageTemplate(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "template",
    template: {
      name: "hello_world",
      language: {
        code: "en_US",
      },
    },
  });
  return data;
}
function TemplateApple(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "template",
    template: {
      name: "apple",
      language: {
        code: "en_US",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                link: "https://tools.corenexis.com/image/cnxm/Q24/12/0b6d96dfa0.webp",
              },
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: "The iPhone is a line of smartphones developed and marketed by Apple that run iOS, the company's own mobile operating system.",
            },
          ],
        },
      ],
    },
  });
  return data;
}

function MessageLists(number) {
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
        text: "Electronic Application",
      },
      footer: {
        text: "Mobile, Desktop, Tablet",
      },
      action: {
        button: " Options",
        sections: [
          {
            title: "First",
            rows: [
              {
                id: "001",
                title: "Laptop",
                description: "Information 1",
              },
              {
                id: "002",
                title: "Mobile",
                description: "Information 2",
              },
            ],
          },
          {
            title: "Second",
            rows: [
              {
                id: "021",
                title: "Desktop",
                description: "Information 21",
              },
              {
                id: "022",
                title: "Tablet",
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

function MessageAudio(number) {
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

function MessageButtons(number) {
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

function Messagemobile(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    recipient_type: "individual",
    type: "template",
    template: {
      namespace: "66b546d4_0b6e_4a13_b616_1e4a1a339b84",
      name: "mobile",
      language: {
        code: "en_US",
        policy: "deterministic",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                link: "https://i.imgur.com/xL3e7CQ.jpeg",
              },
            },
          ],
        },
        {
          type: "button",
          index: "0",
          sub_type: "url",
          parameters: [
            {
              type: "text",
              text: "x",
            },
          ],
        },
      ],
    },
  });
  return data;
}

function MessageFlow(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "template",
    template: {
      name: "trai",
      language: {
        code: "en_US",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                link: "https://i.imgur.com/ISCuB9i.jpeg",
              },
            },
          ],
        },
        {
          type: "button",
          sub_type: "flow",
          index: "0",
        },
      ],
    },
  });
  return data;
}

function flowMessage(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "interactive",
    interactive: {
      type: "flow",
      header: {
        type: "text",
        text: "Hello there 👋",
      },
      body: {
        text: "Ready to transform your space? Schedule a personalized consultation with our expert team!",
      },
      footer: {
        text: "Click the button below to proceed",
      },
      action: {
        name: "flow",
        parameters: {
          flow_id: "588779217462262",
          flow_message_version: "3",
          flow_token: "Trai",
          flow_cta: "Insurance",
          flow_action: "data_exchange",
        },
      },
    },
  });
  return data;
}

function Catalog(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "template",
    template: {
      name: "mobile_catalog",
      language: { code: "en_US" },
      components: [
        {
          type: "button",
          sub_type: "CATALOG",
          index: 0,
          parameters: [
            {
              type: "action",
              action: { thumbnail_product_retailer_id: "0j7pqgnivr" },
            },
          ],
        },
      ],
    },
  });

  return data;
}

function multiproductcatalog(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "interactive",
    interactive: {
      type: "product_list",
      header: {
        type: "text",
        text: "🔥 Featured Products",
      },
      body: {
        text: "Check out our latest products below:",
      },
      footer: {
        text: "🛒 Shop Now",
      },
      action: {
        catalog_id: "1098367448423889",
        sections: [
          {
            title: "Best Sellers",
            product_items: [
              { product_retailer_id: "0j7pqgnivr" },
              { product_retailer_id: "sgfk3ti999" },
            ],
          },
        ],
      },
    },
  });

  return data;
}

function LTO(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "template",
    template: {
      name: "limited_offer",
      language: { code: "en_US" },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: { link: "https://i.imgur.com/ISCuB9i.jpeg" }, // Replace with your image ID
            },
          ],
        },
        {
          type: "body",
          parameters: [
            { type: "text", text: "Pablo" }, // Customer Name
            { type: "text", text: "CARIBE25" }, // Offer Code
          ],
        },
        {
          type: "LIMITED_TIME_OFFER",
          parameters: [
            {
              type: "LIMITED_TIME_OFFER",
              limited_time_offer: { expiration_time_ms: 1209600000 }, // 14 days in milliseconds
            },
          ],
        },
        {
          type: "button",
          sub_type: "copy_code",
          index: 0,
          parameters: [
            { type: "coupon_code", coupon_code: "CARIBE25" }, // Coupon Code
          ],
        },
      ],
    },
  });
  return data;
}

function singleproductcatalog(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "interactive",
    interactive: {
      type: "product",
      body: {
        text: "Check out our latest products!",
      },
      action: {
        catalog_id: "1098367448423889",
        product_retailer_id: "0j7pqgnivr",
      },
    },
  });
  return data;
}

module.exports = {
  MessageText,
  TemplateApple,
  MessageLists,
  MessageTemplate,
  MessageImage,
  MessageAudio,
  MessageButtons,
  Messagemobile,
  MessageFlow,
  ReplyMessage,
  flowMessage,
  multiproductcatalog,
  Catalog,
  LTO,
  singleproductcatalog,
};
