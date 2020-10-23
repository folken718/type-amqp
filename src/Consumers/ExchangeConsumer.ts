import { v4 as uuidv4 } from 'uuid';
import { IConsumer } from '../Interfaces/IConsumer';
import amqp, { Channel } from 'amqplib';
import { IMessageProcessor } from '../Interfaces/IMessageProcessor';
import { IConfigurations } from '../Interfaces/IConfigurations';
import { MessageProcessorFactory } from '../Factories/MessageProcessorFactory';
import { MessageProcessorType } from '../Enums/MessageProcessorsType';
import { IConfigurationProvider } from '../Interfaces/IConfigurationProvider';
import { EnvConfigurationsProvider } from '../ConfigurationProviders/EnvConfigurationProvider';
import { ConsoleOutputMessageProcessor } from '../MessageProcessors/ConsoleOutputMessageProcessor';

const preGeneratedId = `Consumer-${uuidv4()}`;

export class ExchangeConsumer implements IConsumer {
  consumerId: string;
  messageProcessor: IMessageProcessor;
  configurations: IConfigurationProvider;

  constructor(
    messageProcessor: IMessageProcessor = new ConsoleOutputMessageProcessor(preGeneratedId),
    configurations: IConfigurationProvider = new EnvConfigurationsProvider(),
    consumerId: string = preGeneratedId
  ) {
    this.messageProcessor = messageProcessor;
    this.configurations = configurations;
    this.consumerId = consumerId;
  }

  async createConnection(): Promise<amqp.Connection> {
    return amqp.connect(this.configurations.getAmqpURL());
  }

  async init() {
    const conn = await this.createConnection();
    const channel = await conn.createChannel();
    return channel;
  }

  async consumeMessages(): Promise<void> {
    const { queue, exchange, routeKey } = this.configurations.getConfigurations();
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
      await channel.consume(
        queue, (msg) => {
          if (msg) this.messageProcessor.processMessage(channel, msg);
        }, { noAck: false }
      )
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}