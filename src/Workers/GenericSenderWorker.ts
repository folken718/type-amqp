import { IConsumer } from "../Interfaces/IConsumer";
import { ISender } from "../Interfaces/ISender";
import { IConsumerWorker } from "../Interfaces/IConsumerWorker";
import { ISenderWorker } from "../Interfaces/ISenderWorker";

export class GenericSenderWorker implements ISenderWorker {
  sender: ISender;

  constructor(sender: ISender) {
    this.sender = sender;
  }

  send(msg: string | ArrayBuffer): Promise<void> {
    console.log(`'Starting ${this.sender.getSenderId()} sender worker...'`);
    return this.sender.sendMessage(msg);
  }

}