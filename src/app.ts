import * as express from "express";
import * as dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

const app = express();
let port = process.env.PORT;

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
const io = new Server(http, {
    cors: { origin: "*" } 
});

// whenever a user connects on port via
// a websocket, log that a user has connected
io.on("connection", function(socket: any) {
    console.log("a user connected");
    // whenever we receive a 'message' we log it out
    socket.on("message", function(message: any) {
      console.log(message);
    });
});

const server = http.listen(port, function() {
  console.log(`listening on *: ${port}`);
});