import { Channel, Message } from 'amqplib';

export interface IMessageProcessor {
  consumerId: string;
  channel: Channel;
  processMessage(msg: Message): void;
}
