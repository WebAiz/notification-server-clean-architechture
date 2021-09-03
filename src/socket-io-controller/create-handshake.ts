// Interfaces and types
import {Socket}         from "socket.io";
import {IVerifyByToken} from "../interfaces";

class CreateHandshake {
    private users: any[];

    constructor() {
        this.users = [];
    }

    connection = (verifyByToken: IVerifyByToken) => async (socket: Socket): Promise<void> => {
        try {
            console.log(`CLIENT ${socket.id} CONNECTED`)
            const clientId = socket.handshake.auth.token;

            if (clientId) {
                await verifyByToken(clientId)
                this.users.push({
                    clientId,
                    socketId: socket.id,
                })
                socket.join(clientId)
                socket.emit("Token from Socket Server", clientId)
            } else {
                socket.disconnect()
            }

            console.log("List of users", this.users.length, this.users)
            socket.on("disconnect", () => {
                console.log(`CLIENT ${socket.id} DISCONNECTED`)
                this.users = this.users.filter((user) => user.socketId !== socket.id);
            });

        } catch (error) {
            socket.disconnect()
            throw new Error("Error with Socket")
        }
    }
}

export = new CreateHandshake;
