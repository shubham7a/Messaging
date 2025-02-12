const express = require("express");
const apiRoute = require("./routes/routes");
const cors = require("cors");
const crypto = require("crypto");
const dotenv = require("dotenv");
const axios = require("axios");
const {
  decryptRequest,
  encryptResponse,
  FlowEndpointException,
} = require("./encryption.js");
const { getNextScreen } = require("./flow.js");

dotenv.config();

const { app, server, io } = require("./SocketIO/server.js");

const { APP_SECRET, PRIVATE_KEY, PASSPHRASE = "", PORT = "4000" } = process.env;

app.use(
  express.json({
    // store the raw request body to use it for signature verification
    verify: (req, res, buf, encoding) => {
      req.rawBody = buf?.toString(encoding || "utf8");
    },
  })
);

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/whatsapp", apiRoute);

let flowdata = null;

app.post("/", async (req, res) => {
  if (!PRIVATE_KEY) {
    throw new Error(
      'Private key is empty. Please check your env variable "PRIVATE_KEY".'
    );
  }

  if (!isRequestSignatureValid(req)) {
    return res.status(432).send();
  }

  let decryptedRequest = null;
  try {
    decryptedRequest = decryptRequest(req.body, PRIVATE_KEY, PASSPHRASE);
  } catch (err) {
    console.error(err);
    if (err instanceof FlowEndpointException) {
      return res.status(err.statusCode).send();
    }
    return res.status(500).send();
  }

  const { aesKeyBuffer, initialVectorBuffer, decryptedBody } = decryptedRequest;

  const screenResponse = await getNextScreen(decryptedBody);

  if (screenResponse.screen === "SUMMARY") {
    flowdata = screenResponse.data;
    console.log("flowdata", flowdata);
  }

  res.send(encryptResponse(screenResponse, aesKeyBuffer, initialVectorBuffer));
});

function isRequestSignatureValid(req) {
  if (!APP_SECRET) {
    console.warn(
      "App Secret is not set up. Please Add your app secret in /.env file to check for request validation"
    );
    return true;
  }

  const signatureHeader = req.get("x-hub-signature-256");
  const signatureBuffer = Buffer.from(
    signatureHeader.replace("sha256=", ""),
    "utf-8"
  );

  const hmac = crypto.createHmac("sha256", APP_SECRET);
  const digestString = hmac.update(req.rawBody).digest("hex");
  const digestBuffer = Buffer.from(digestString, "utf-8");

  if (!crypto.timingSafeEqual(digestBuffer, signatureBuffer)) {
    console.error("Error: Request Signature did not match");
    return false;
  }
  return true;
}

const uploadPublicKey = async () => {
  const phoneNumberId = "173000262573577"; // Replace with your actual phone number ID
  const accessToken = process.env.ACCESS_TOKEN; // Replace with your actual access token
  const publicKey = process.env.PUBLIC_KEY; // Replace with your actual public key

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/whatsapp_business_encryption`,
      new URLSearchParams({
        business_public_key: publicKey,
      }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Public key uploaded successfully", response.data);
  } catch (error) {
    console.error("Error uploading public key", error.response.data);
  }
};

uploadPublicKey();

app.get("/", (req, res) => res.send("hello"));

server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});

module.exports = flowdata;
