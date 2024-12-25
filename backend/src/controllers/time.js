const moment = require("moment-timezone");

// Update the timestamp to Asia/Kolkata time
const getAsiaKolkataTime = () => moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

module.exports = { getAsiaKolkataTime };