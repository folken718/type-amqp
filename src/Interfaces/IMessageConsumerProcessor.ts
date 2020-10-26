import { Channel, Message } from 'amqplib';

export interface IMessageConsumerProcessor {
  processMessage(channel: Channel, msg: Message): void;
}
