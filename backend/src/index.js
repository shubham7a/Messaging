const express = require("express");
const apiRoute = require("./routes/routes");
const cors = require("cors");

//import { app, server } from "./SocketIO/server.js";\

const { app, server } = require("./SocketIO/server.js");

// const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/whatsapp", apiRoute);

const Port = 4000;

app.get("/", (req, res) => res.send("hello"));

server.listen(Port, () => {
  console.log(`Server is Running on port ${Port}`);
});
