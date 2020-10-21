import * as connProvider from '../Connection/AmqpConnProvider';
import { v4 as uuidv4 } from 'uuid';
import { Channel, Message } from 'amqplib';

const consumerId = `Consumer-${uuidv4()}`;

const processMessage = (consumerId: string, msg: Message, channel: Channel) => {
  console.log(`${consumerId} - ${msg.content.toString()}`);
  channel.ack(msg);
}

const consumeMsg = async (queue: string) => {
  try {
    await connProvider.setupAndStartConnection();
    await connProvider.channel.assertQueue(queue, { durable: false });
    await connProvider.channel.prefetch(1);
    await connProvider.channel.consume(
      queue,
      (msg) => {
        if (msg) processMessage(consumerId, msg, connProvider.channel);
      },
      { noAck: false },
    );
  } catch (error) {
    console.error('Error: ', error);
  }
};

(async () => {
  await consumeMsg(connProvider.queue);
})();
