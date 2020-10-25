import { ExchangeConsumer } from "./Consumers/ExchangeConsumer";
import { GenericConsumerWorker } from "./Workers/GenericConsumerWorker";

(async () => {
  const consumer = new ExchangeConsumer();
  const worker = new GenericConsumerWorker(consumer);
  worker.start();
})();