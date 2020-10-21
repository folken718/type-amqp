import amqp, { Message } from 'amqplib';
import { IMessageProcessor } from './IMessageProcessor';

export interface IConsumer {
  consumeMessage(msg: Message): void;
  getConnection(): Promise<amqp.Connection>;
  getMessageProcessor(): IMessageProcessor;
  getConfigurations(
    const conf = new ConfigurationProvider();

  ): Configurations;
}
