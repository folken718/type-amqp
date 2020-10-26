import { Channel, Message } from 'amqplib';
import { IMessageConsumerProcessor } from '../Interfaces/IMessageConsumerProcessor';

export class ConsoleOutputMessageProcessor implements IMessageConsumerProcessor {
  consumerId: string;

  constructor(consumerId: string) {
    this.consumerId = consumerId;
  }

  processMessage(channel: Channel, msg: Message): void {
    console.log(`***** ${this.consumerId} *****`);
    console.log(JSON.parse(msg?.content.toString()));
    console.log(`***** ----- *****`);
    channel.ack(msg);
  }
}
