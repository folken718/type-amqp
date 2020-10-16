import * as amqp from 'amqplib';
import dotenv from "dotenv";

dotenv.config();

export let connection: amqp.Connection;
export let channel: amqp.Channel;

const host = `${process.env.HOST}:${process.env.PORT}`;

export async function InitConnection(): Promise<void> {
    try {
        connection = await amqp.connect(host);
        channel = await connection.createChannel();
    } catch (error) {
        console.error(error);
    }
}