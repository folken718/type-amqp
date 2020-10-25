import { Connection, Channel } from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import amqp from 'amqplib';
import { IConfigurationProvider } from '../Interfaces/IConfigurationProvider';
import { ISender } from '../Interfaces/ISender';
import { EnvConfigurationsProvider } from '../ConfigurationProviders/EnvConfigurationProvider';

const preGeneratedId = `Publisher-${uuidv4()}`;

export class ExchangePublisher implements ISender {
  publisherId: string;
  configurations: IConfigurationProvider;

  constructor(
    configurations: IConfigurationProvider = new EnvConfigurationsProvider(),
    publisherId: string = preGeneratedId) {
    this.configurations = configurations;
    this.publisherId = publisherId;
  }
  getSenderId(): string {
    return this.publisherId;
  }

  async createConnection(): Promise<Connection> {
    return amqp.connect(this.configurations.getAmqpURL());
  }

  async init(): Promise<{ connection: Connection, channel: Channel }> {
    const connection = await this.createConnection();
    const channel = await connection.createChannel();
    return { connection, channel };
  }

  async sendMessage(msg: ArrayBuffer): Promise<void> {
    const { connection, channel } = await this.init();
    try {
      await channel.assertExchange(this.configurations.getExchange(), 'direct', { durable: false });
      channel.publish(this.configurations.getExchange(), this.configurations.getRouteKey(), Buffer.from(msg))
    } catch (error) {
      console.error(`Error on ${this.publisherId} : `, error)
    } finally {
      setTimeout(async () => {
        await connection.close();
      }, 1000);
    }
  }

}

