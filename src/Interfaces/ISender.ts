import amqp from 'amqplib';

export interface ISender {
  createConnection(): Promise<amqp.Connection>;
  init(): Promise<amqp.Channel>;
  sendMessage(queue: string, msg: ArrayBuffer): Promise<void>;
}
