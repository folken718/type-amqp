import amqp from 'amqplib';

export interface ISender {
  sendMessage(msg: string | ArrayBuffer): Promise<void>;
  getSenderId(): string;
}
