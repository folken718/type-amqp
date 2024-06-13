import { v4 as uuidv4 } from 'uuid';
import { IConsumer } from '../Interfaces/IConsumer';
import amqp, { Channel, Connection } from 'amqplib';
import { IMessageConsumerProcessor } from '../Interfaces/IMessageConsumerProcessor';
import { IConfigurationProvider } from '../Interfaces/IConfigurationProvider';
import { EnvConfigurationsProvider } from '../ConfigurationProviders/EnvConfigurationProvider';
import { ConsoleOutputMessageProcessor } from '../MessageProcessors/ConsoleOutputMessageProcessor';

export class ExchangeConsumer implements IConsumer {
  preGeneratedId = `Consumer-${uuidv4()}`;
  consumerId: string;
  messageProcessor: IMessageConsumerProcessor;
  configurations: IConfigurationProvider;

  constructor(
    messageProcessor: IMessageConsumerProcessor,
    configurations: IConfigurationProvider,
    consumerId: string
  ) {
    this.messageProcessor = messageProcessor
    this.configurations = configurations;
    this.consumerId = consumerId || this.preGeneratedId;
  }
  getConsumerId(): string {
    return this.consumerId;
  }

  async createConnection(): Promise<amqp.Connection> {
    return amqp.connect(this.configurations.getAmqpURL());
  }

  async init(): Promise<{ connection: Connection, channel: Channel }> {
    const connection = await this.createConnection();
    const channel = await connection.createChannel();
    return { connection, channel };
  }

  async consumeMessages(): Promise<void> {
    const { queue, exchange, routeKey } = this.configurations.getConfigurations();

    try {
      const { connection, channel } = await this.init();
      await channel.assertExchange(
        exchange,
        'direct',
        { durable: false }
      );
      await channel.assertQueue(queue, { durable: false });
      await channel.bindQueue(queue, exchange, routeKey);
      await channel.prefetch(1);
      await channel.consume(
        queue, (msg) => {
          if (msg) this.messageProcessor.processMessage(channel, msg);
        }, { noAck: false }
      )
    } catch (error) {
      console.error(`Error on ${this.consumerId} : `, error);
    }
  }
}