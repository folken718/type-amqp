import * as conn from '../Connections/Connection';
import dotenv from "dotenv";
import { Message } from 'amqplib';

dotenv.config();

const queue = process.env.QUEUE || "ExampleQueue";

function printMessage(msg: string): void {
    console.log(msg);
}

export async function ConsumeMessages(): Promise<void> {
    try {
        await conn.InitConnection();
        await conn.channel.assertQueue(queue, { durable: false });
        await conn.channel.consume(queue, (msg) => {
            printMessage(msg?.content.toString() || "");
            conn.channel.ack(msg as Message);
        });
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    ConsumeMessages();
})();