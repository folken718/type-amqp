import amqp, { Message } from 'amqplib';
import { Configurations } from './IConfigurations';
import { IMessageProcessor } from './IMessageProcessor';

export interface IConsumer {
  consumeMessage(msg: Message): void;
  getConnection(): Promise<amqp.Connection>;
  getMessageProcessor(channel: amqp.Channel): IMessageProcessor;
  getConfigurations(): Configurations;
  init(): Promise<amqp.Channel>;
}
