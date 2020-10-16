import * as conn from '../Connections/Connection';
import dotenv from "dotenv";

dotenv.config();

const queue = process.env.QUEUE || "ExampleQueue";


export async function sendDirectMessage(msg: string): Promise<void> {
    try {
        await conn.InitConnection();
        await conn.channel.assertQueue(queue, { durable: false })
        conn.channel.sendToQueue(queue, Buffer.from(msg));
    } catch (error) {
        console.error(error);
    } finally {
        setTimeout(async () => {
            await conn.connection.close();
        }, 1000);
    }
}

(async () => {
    await sendDirectMessage("Hello world!!");
})();