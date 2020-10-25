import { IConsumer } from "../Interfaces/IConsumer";
import { IConsumerWorker } from "../Interfaces/IConsumerWorker";

export class GenericConsumerWorker implements IConsumerWorker {
  consumer: IConsumer;

  constructor(consumer: IConsumer) {
    this.consumer = consumer;
  }

  start(): Promise<void> {
    console.log(`'Starting ${this.consumer.getConsumerId()} consumer worker...'`);
    return this.consumer.consumeMessages();
  }

}