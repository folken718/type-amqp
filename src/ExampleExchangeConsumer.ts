import { ExchangeConsumer } from "./Consumers/ExchangeConsumer";
import { GenericWorker } from "./Workers/GenericWorker";

(async () => {
  const consumer = new ExchangeConsumer();
  const worker = new GenericWorker(consumer);
  worker.start();
})();