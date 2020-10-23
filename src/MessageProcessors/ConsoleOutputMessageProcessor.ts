import { Channel, Message } from 'amqplib';
import { IMessageProcessor } from '../Interfaces/IMessageProcessor';

export class ConsoleOutputMessageProcessor implements IMessageProcessor {
  consumerId: string;

  constructor(consumerId: string) {
    this.consumerId = consumerId;
  }

  processMessage(channel: Channel, msg: Message): void {
    console.log(`***** ${this.consumerId} *****`);
    console.log(msg?.content.toString());
    console.log(`***** ----- *****`);
    channel.ack(msg);
  }
}
