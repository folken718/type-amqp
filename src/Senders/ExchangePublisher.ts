import { Connection, Channel } from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import amqp from 'amqplib';
import { IConfigurationProvider } from '../Interfaces/IConfigurationProvider';
import { ISender } from '../Interfaces/ISender';
import { EnvConfigurationsProvider } from '../ConfigurationProviders/EnvConfigurationProvider';
import { log } from 'console';

export class ExchangePublisher implements ISender {
  publisherId: string;
  configurations: IConfigurationProvider;
  connection: Connection;
  channel: Channel;

  constructor(
    configurations: IConfigurationProvider = new EnvConfigurationsProvider(),
    publisherId: string = `Publisher-${uuidv4()}`,
    connection: Connection,
    channel: Channel
  ) {
    this.configurations = configurations;
    this.publisherId = publisherId;
    this.connection = connection;
    this.channel = channel;
  }
  
  getSenderId(): string {
    return this.publisherId;
  }

  async sendMessage(msg: ArrayBuffer): Promise<void> {
    try {
      await this.channel.assertExchange(this.configurations.getExchange(), 'direct', { durable: false });
      this.channel.publish(this.configurations.getExchange(), this.configurations.getRouteKey(), Buffer.from(msg))
    } catch (error) {
      throw new Error(`Error on ${this.publisherId} : ${error}`)
    } 
  }
}

