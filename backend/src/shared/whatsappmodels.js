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

function MessageTemplate(number)
{
   const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
     type: "template",
      template: {
         name: "hello_world",
         language: { 
          "code": "en_US" 
        } } });
        return data
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

module.exports = { MessageText, TemplateApple, MessageLists ,MessageTemplate};
