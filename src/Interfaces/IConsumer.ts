import amqp from 'amqplib';

export interface IConsumer {
  consumeMessages(): Promise<void>;
  createConnection(): Promise<amqp.Connection>;
  init(): Promise<amqp.Channel>;
}
