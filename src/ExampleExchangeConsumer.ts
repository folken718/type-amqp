import { EnvConfigurationsProvider } from "./ConfigurationProviders/EnvConfigurationProvider";
import { ExchangeConsumer } from "./Consumers/ExchangeConsumer";
import { ConsoleOutputMessageProcessor } from "./MessageProcessors/ConsoleOutputMessageProcessor";
import { GenericConsumerWorker } from "./Workers/GenericConsumerWorker";
import { v4 as uuidv4 } from 'uuid';

(async () => {
  
  const id = `${uuidv4()}`
  const consumer = new ExchangeConsumer(
    new ConsoleOutputMessageProcessor(id), new EnvConfigurationsProvider(), id
  );
  const worker = new GenericConsumerWorker(consumer);
  worker.start();
})();