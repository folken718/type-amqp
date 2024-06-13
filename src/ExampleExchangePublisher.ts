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
    conn.getConnection() as Connection, 
    conn.getChannel() as Channel
  );
  const worker = new GenericSenderWorker(publisher);
  const interval = setInterval(async () => {
    await worker.send(JSON.stringify({ msg: `hello World!! ${uuidv4()}` }));
  }, randomInt(1000, 3000));

  process.on('SIGINT', async () => {
    clearInterval(interval);
    setTimeout(async () => {await conn.closeConnection()}, 5000)
  });
})();