import { ExchangePublisher } from "./Senders/ExchangePublisher";
import { GenericSenderWorker } from "./Workers/GenericSenderWorker";

(async () => {
  const publisher = new ExchangePublisher();
  const worker = new GenericSenderWorker(publisher);
  await worker.send('Hello world!!');
})();