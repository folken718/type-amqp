import { v4 as uuidv4 } from 'uuid';
import { IConsumer } from '../Interfaces/IConsumer';
import amqp, { Channel } from 'amqplib';
import { IMessageProcessor } from '../Interfaces/IMessageProcessor';
import { Configurations } from '../Interfaces/IConfigurations';
import { provideConfigurations } from '../ConfigurationProvider';
import { MessageProcessorFactory } from '../Factories/MessageProcessorFactory';
import { MessageProcessorType } from '../Enums/MessageProcessorsType';

export class ExchangeConsumer implements IConsumer {
  consumerId = `Consumer-${uuidv4()}`;
  messageProcessor: MessageProcessorType;

  constructor(messageProcessor: MessageProcessorType) {
    this.messageProcessor = messageProcessor;
  }

  getConfigurations(): Configurations {
    return provideConfigurations();
  }

  async getConnection(): Promise<amqp.Connection> {
    const conf = this.getConfigurations();
    return amqp.connect(conf.amqpServer);
  }

  getMessageProcessor(channel: Channel): IMessageProcessor {
    return MessageProcessorFactory.getMessageProcesor(this.messageProcessor, this.consumerId, channel);
  }

  async init() {
    const conn = await this.getConnection();
    const channel = await conn.createChannel();
    return channel;
  }

  async consumeMessage(): Promise<void> {
    const { queue, exchange, routeKey } = this.getConfigurations();
    const channel = await this.init();
    try {
      await channel.assertExchange(
        exchange,
        'direct',
        { durable: false }
      );
      await channel.assertQueue(queue, { durable: false });
      await channel.bindQueue(queue, exchange, routeKey);
      await channel.prefetch(1);
      const processor = this.getMessageProcessor(channel);
      await channel.consume(
        queue, (msg) => {
          if (msg) processor.processMessage(msg);
        }, { noAck: false }
      )
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}

(async () => {
  const exchangeWorker = new ExchangeConsumer(MessageProcessorType.CONSOLE_OUTPUT);
  await exchangeWorker.consumeMessage();
})();
/*
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
*/

