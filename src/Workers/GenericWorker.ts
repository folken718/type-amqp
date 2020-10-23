import { IConsumer } from "../Interfaces/IConsumer";
import { IWorker } from "../Interfaces/IWorker";

export class GenericWorker implements IWorker {
  consumer: IConsumer;

  constructor(consumer: IConsumer) {
    this.consumer = consumer;
  }

  start(): Promise<void> {
    console.log('Starting consumer worker...');
    return this.consumer.consumeMessages();
  }

}