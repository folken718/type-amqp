import amqp, { Message } from 'amqplib';
import { IConfigurations } from './IConfigurations';
import { IMessageProcessor } from './IMessageProcessor';

export interface IConsumer {
  consumeMessages(): Promise<void>;
  createConnection(): Promise<amqp.Connection>;
  init(): Promise<amqp.Channel>;
}
