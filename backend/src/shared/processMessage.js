const whatsappModel = require("../shared/whatsappmodels");
const whatsappService = require("../services/whatsappServices");

function Process(textUser, number,message_id) {
  textUser = textUser.toLowerCase();
  var models = [];
  if (textUser.includes("hii")) {
    var model = whatsappModel.MessageText("Hello User", number);
    models.push(model);
    var modellist = whatsappModel.Messagemobile(number);
    models.push(modellist);
  } else if (textUser.includes("hello")) {
    var model = whatsappModel.ReplyMessage("Hello. How are you?", number,message_id);
    models.push(model);
  } else if (textUser.includes("thank you")) {
    var model = whatsappModel.MessageFlow(number);
    models.push(model);
  } else if (
    textUser.includes("bye") ||
    textUser.includes("goodbye") ||
    textUser.includes("leave")
  ) {
    var model = whatsappModel.MessageText("Good Bye", number);
    models.push(model);
  } else {
    var model = whatsappModel.MessageText(
      "Ok",
      number
    );
    models.push(model);
  }

  models.forEach((model) => {
    whatsappService.SendMessageWhatsApp(model);
  });
}

module.exports = { Process };
