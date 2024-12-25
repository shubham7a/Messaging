const express = require("express");
const router = express.Router();
const whatsappcontroller = require("../controllers/whatsappcontrollers");

router.get("/", whatsappcontroller.verfiToken);
router.post("/", whatsappcontroller.ReceivedMessage);
router.post("/send-messages", whatsappcontroller.sendMessage);

module.exports = router;
