import * as express from "express";
import * as dotenv from "dotenv";
import { Server } from "socket.io";
import * as protocol from "http";

class SocketIO{

	public app: express.Application;
	public http : any;
	public io : any;
	public port : string;

	constructor() {
		dotenv.config();
		this.app = express();
		this.http = new protocol.Server(this.app);
		this.port = process.env.PORT;
		this.config();
		this.events();
	}

	public config(): void {
		this.app.set("port", process.env.PORT || 3000);
		this.io = new Server(this.http, {
			cors: { origin: "*" } 
		});
	}

	public events() : void {
		this.io.on("connection", function(socket: any) {
			console.log("a user connected");
			// whenever we receive a 'message' we log it out
			socket.on("message", function(message: any) {
				console.log(message);
				socket.emit("message", message);
			});
		});
	}

	public start(): void {
		this.http.listen(this.port, function() {
			console.log(`listening on *: ${this.port}`);
		});
	}

}

const server = new SocketIO();

server.start();