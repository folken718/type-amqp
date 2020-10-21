import * as connProvider from '../Connection/AmqpConnProvider';
import { v4 as uuidv4 } from 'uuid';
import { processMessage } from '../../dist/MessageProcessors/LogMessageProcessor';
import { IConsumer } from '../Interfaces/IConsumer';
import { Message } from 'amqplib';
import { IMessageProcessor } from '../Interfaces/IMessageProcessor';

const consumerId = `Consumer-${uuidv4()}`;

export class ExchangeConsumer implements IConsumer {

  consumeMessage(msg: Message): void {
  }

  getConnection(): Promise<Connection> {
    return Promise.resolve(undefined);
  }

  getMessageProcessor(): IMessageProcessor {
    return undefined;
  }

}

const consumeMsg = async (queue: string) => {
  console.log(`[${consumerId}] - Starting Consumer`);
  try {
    await connProvider.setupAndStartConnection();
    await connProvider.channel.assertExchange(connProvider.exchange, 'direct', { durable: false });
    await connProvider.channel.assertQueue(queue, { durable: false });
    await connProvider.channel.bindQueue(queue, connProvider.exchange, connProvider.routeKey);
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
