const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {postNotification} = require('./controllers');
const makeExpressCallback = require('./express-callback');
const express = require('express');
const cors = require('cors');
const http = require('http')
const app = express()
const server = http.createServer(app);

dotenv.config()

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

app.post(`/notifications`, makeExpressCallback(postNotification))

// listen for requests
server.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
})

module.exports = {app}
