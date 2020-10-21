import amqp from 'amqplib';
import * as dotenv from 'dotenv';

export let conn: amqp.Connection;
export let channel: amqp.Channel;
export let confirmChannel: amqp.ConfirmChannel;

dotenv.config();

const amqpServer = `amqp://${process.env.AMQP_HOST}:${process.env.AMQP_PORT}` || 'amqp://localhost:5672';
export const queue = process.env.QUEUE || 'ExampleQueue';
export const exchange = process.env.EXCHANGE || 'ExampleExchange';
export const routeKey = process.env.ROUTE_KEY || 'xyz';

export const setupAndStartConnection = async (): Promise<void> => {
  try {
    conn = await amqp.connect(amqpServer);
    channel = await conn.createChannel();
    confirmChannel = await conn.createConfirmChannel();

    channel.on('close', () => {
      console.log('Closing channel');
    });

    channel.on('error', (error) => {
      console.error('Channel Error: ', error);
    });

    conn.on('close', (error) => {
      if (error) console.error(`There was and error in the connection: ${error}`);
      console.log('Closing connection...');
    });

    conn.on('error', (error) => {
      if (error) console.error(`There was and error in the connection: ${error}`);
    });
  } catch (error) {
    console.log('Connection Error', error);
  }
};

export const closeConnection = async (): Promise<void> => {
  await channel.close();
  await confirmChannel.close();
  await conn.close();
};

process.on('SIGINT', async () => {
  await closeConnection();
});
