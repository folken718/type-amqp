import { Channel, Message } from 'amqplib';

export interface IMessageProcessor {
  processMessage(channel: Channel, msg: Message): void;
}
