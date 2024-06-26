import { Channel } from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import { IConfigurationProvider } from '../Interfaces/IConfigurationProvider';
import { ISender } from '../Interfaces/ISender';
import { EnvConfigurationsProvider } from '../ConfigurationProviders/EnvConfigurationProvider';

export class ExchangePublisher implements ISender {
  publisherId: string;
  configurations: IConfigurationProvider;
  channel: Channel;

  constructor(
    configurations: IConfigurationProvider = new EnvConfigurationsProvider(),
    publisherId: string = `Publisher-${uuidv4()}`,
    channel: Channel
  ) {
    this.configurations = configurations;
    this.publisherId = publisherId;
    this.channel = channel;
  }

  getSenderId(): string {
    return this.publisherId;
  }

  async sendMessage(msg: ArrayBuffer): Promise<void> {
    try {
      await this.channel.assertExchange(
        this.configurations.getExchange(),
        'direct',
        { durable: false }
      );
      this.channel.publish(
        this.configurations.getExchange(),
        this.configurations.getRouteKey(),
        Buffer.from(msg)
      );
    } catch (error) {
      throw new Error(`Error on ${this.publisherId} : ${error}`);
    }
  }
}
