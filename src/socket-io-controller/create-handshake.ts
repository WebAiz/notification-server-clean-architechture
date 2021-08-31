class CreateHandshake {
    private users: any[];
    constructor() {
        this.users = [];
    }

    connection = ({verifyClientId}) => async (socket) => {
        try {
            console.log(`CLIENT ${socket.id} CONNECTED`)
            const clientId = socket.handshake.auth.token;
            if (clientId) {
                await verifyClientId(clientId)
                this.users.push({
                    clientId,
                    socketId: socket.id,
                })
                socket.join(clientId)
                socket.emit('Token from Socket Server', clientId)
            } else {
                return socket.disconnect()
            }
            console.log('List of users', this.users.length, this.users)
            socket.on('disconnect', () => {
                console.log(`CLIENT ${socket.id} DISCONNECTED`)
                this.users = this.users.filter((user) => user.socketId !== socket.id);
            });
        } catch (error) {
            socket.disconnect()
        }
    }
}

module.exports = new CreateHandshake;
