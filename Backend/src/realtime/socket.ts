import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let socket : Server | null = null;

export function initSocket(httpServer: HttpServer) {
    socket = new Server(httpServer, {
        cors: {
            origin:'*',
            methods: ['GET', 'POST']
        }
    });

    socket.on('connection', (client) => {
        console.log('WS Client connected: ',client.id)

        client.on('disconnect',() => {
            console.log('WS Client disconnected: ',client.id)

        })
    });

    return socket;
}


export function getSocket() : Server {
    if(!socket) throw new Error("Socket not initialized.")
    return socket;
}