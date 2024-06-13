import { v4 as uuidv4 } from 'uuid';
import { Channel, Connection } from "amqplib";
import { EnvConfigurationsProvider } from "./ConfigurationProviders/EnvConfigurationProvider";
import { ConnectionProvider } from "./Connection/ConnectionProvider";
import { ExchangePublisher } from "./Senders/ExchangePublisher";
import { GenericSenderWorker } from "./Workers/GenericSenderWorker";

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

(async () => {
  const preGeneratedId = `Producer-${uuidv4()}`;
  const conn = new ConnectionProvider(new EnvConfigurationsProvider());
  await conn.init();
  const publisher = new ExchangePublisher(
    conn.getConfigurations(),
    preGeneratedId, 
    conn.getChannel() as Channel
  );
  const publisher2 = new ExchangePublisher(
      conn.getConfigurations(),
      `Producer2-${uuidv4()}`, 
      conn.getChannel() as Channel
  );

  const worker = new GenericSenderWorker(publisher);
  const worker2 = new GenericSenderWorker(publisher2);
  const interval = setInterval(async () => {
    await worker.send(JSON.stringify({ msg: `hello World!! ${uuidv4()}` }));
    await worker2.send(JSON.stringify({ msg: `hello World!! ${uuidv4()}` }));
  }, randomInt(1000, 2000));

  process.on('SIGINT', async () => {
    clearInterval(interval);
    setTimeout(async () => {await conn.closeConnection()}, 5000)
  });
})();