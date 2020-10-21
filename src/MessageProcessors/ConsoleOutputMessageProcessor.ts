import { Channel, Message } from 'amqplib';
import { IMessageProcessor } from '../Interfaces/IMessageProcessor';

export class ConsoleOutputMessageProcessor implements IMessageProcessor {
  consumerId: string;
  channel: Channel;

  constructor(consumerId: string, channel: Channel) {
    this.consumerId = consumerId;
    this.channel = channel;
  }

  processMessage(msg: Message): void {
    console.log(`***** ${this.consumerId} *****`);
    console.log(msg?.content.toString());
    console.log(`***** ----- *****`);
    this.channel.ack(msg);
  }
}
