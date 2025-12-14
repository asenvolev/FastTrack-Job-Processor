import 'dotenv/config'
import { createApp } from './app';
import { createServer } from 'http';
import mongoose from 'mongoose';
import { initSocket } from './realtime';

const port = Number(process.env.PORT);
const mongoUrl = process.env.MONGODB_URI;

async function main() {
    if (!mongoUrl) {
        throw new Error("No connection string provided");
    }

    await mongoose.connect(mongoUrl);
    console.log('Database connected');

    
    const app = createApp();

    const server = createServer(app);
    initSocket(server);
    console.log('Web Socket initialized');
    
    
    server.listen(port, () => {
        console.log('Backend listening on port ', port);
    });

    const shutdown = async () : Promise<void> => {
        server.close(()=> console.log('Shutting down server'))
        await mongoose.disconnect();
        console.log('Database disconnected')
        process.exit(0);
    }

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
    process.on('uncaughtException', (ex) => {
        console.log('Uncaught Exception: ', ex);
        process.exit(1);
    })
    process.on('unhandledRejection', (ex) => {
        console.log('Unhandled Rejection: ', ex);
        process.exit(1);
    })

}

main().catch((reason) => {
    console.log('Failed to start backend: ', reason);
    process.exit(1);
})