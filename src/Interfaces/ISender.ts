import amqp from 'amqplib';

export interface ISender {
  createConnection(): Promise<amqp.Connection>;
  init(): Promise<{ connection: amqp.Connection, channel: amqp.Channel }>;
  sendMessage(msg: string | ArrayBuffer): Promise<void>;
  getSenderId(): string;
}
