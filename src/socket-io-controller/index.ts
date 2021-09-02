import config          from "./config"
import CreateHandshake from "./create-handshake"
import verifyByToken   from "../utils"
import sendMessage     from "./send-message"
import jwt_decode      from "jwt-decode"
import dotenv          from "dotenv";

dotenv.config()

const io = require("socket.io")(config)
io.listen(process.env.socket_port);

// Namespaces, Note: also referred as receiverGroup
const companyIo = io.of("/company");
const adminIo = io.of("/admin");
const userIo = io.of("/user");

// Handshakes
console.log("Establishing socket connection...")
companyIo.on("connection", CreateHandshake.connection({verifyByToken}))
adminIo.on("connection", CreateHandshake.connection({verifyByToken}))
userIo.on("connection", CreateHandshake.connection({verifyByToken}))

const sendInteractor = sendMessage({jwt_decode, companyIo, adminIo, userIo,verifyByToken})

export default sendInteractor
