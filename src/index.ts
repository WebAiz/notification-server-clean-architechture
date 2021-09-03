import bodyParser                                                            from "body-parser";
import dotenv                                                                from "dotenv";
import {postNotification}                                                    from "./controllers";
import {makeExpressCallback}                                                 from "./express-callback";
import express, {Response as ExResponse, Request as ExRequest, NextFunction} from "express";
import cors                                                                  from "cors";
import http                                                                  from "http"
import {AuthError}                                                           from "./utils";

const app = express()
const server = http.createServer(app);

dotenv.config()

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

app.post(`/notifications`, makeExpressCallback(postNotification))

// listen for requests
server.listen(process.env.express_port, () => {
    console.log(`Server is listening on port ${process.env.express_port}`)
})


