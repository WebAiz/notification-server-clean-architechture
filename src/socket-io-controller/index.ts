// const {app} = require('../index');
// const socket = require('socket.io')
const config = require('./config')
const CreateHandshake = require('./create-handshake')
const {verifyByToken: verifyClientId} = require('../utils')
// const sendMessage = require('./send-message')
import sendMessage from './send-message';

const jwt_decode = require('jwt-decode')

// const io = socket(app, config)
// const socket = require("socket.io");
// const io = socket.listen(3000);

// TODO TEST socket connetion and namespace delivery
const io = require("socket.io")(process.env.PORT,config);

// Namespaces, Note: also referred as receiverGroup
const companyIo = io.of('/company');
const adminIo = io.of('/admin');
const userIo = io.of('/user');

// Handshakes
companyIo.on('connection', CreateHandshake.connection({verifyClientId}))
adminIo.on('connection', CreateHandshake.connection({verifyClientId}))
userIo.on('connection', CreateHandshake.connection({verifyClientId}))

const sendInteractor: object = sendMessage({jwt_decode, companyIo, adminIo, userIo})

export default sendInteractor
