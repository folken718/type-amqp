import * as dotenv from 'dotenv';
import { IConfigurationProvider } from '../Interfaces/IConfigurationProvider';
import { IConfigurations } from '../Interfaces/IConfigurations';
dotenv.config();

export class EnvConfigurationsProvider implements IConfigurationProvider {
  usr: string|undefined;
  passwd: string|undefined;
  host: string;
  port: number;
  amqpServer: string;
  queue: string;
  exchange: string;
  routeKey: string;

  constructor() {
    this.usr = process.env.USER;
    this.passwd = process.env.PASSWD;
    this.host = process.env.AMQP_HOST || 'localhost';
    this.port = Number(process.env.AMQP_PORT) || 5672;
    this.amqpServer = this.usr && this.passwd
    ? `amqp://${this.usr}:${this.passwd}@${this.host}:${this.port.toString()}`
    : `amqp://${this.host}:${this.port}`;
    this.queue = process.env.EXCHANGE || 'ExampleExchange';
    this.exchange = process.env.EXCHANGE || 'ExampleExchange';
    this.routeKey = process.env.ROUTE_KEY || 'xyz';
  }

  getUser(): string|undefined {
    return this.usr;
  }

  getPassword(): string|undefined {
    return this.passwd;
  }

  getHost(): string {
    return this.host;
  }

  getPort(): number {
    return this.port;
  }

  getAmqpURL(): string {
    return this.amqpServer;
  }

  getQueue(): string {
    return this.queue;
  }

  getExchange(): string {
    return this.exchange;
  }

  getRouteKey(): string {
    return this.routeKey;
  }

  getConfigurations(): IConfigurations {
    return { 
      usr: this.usr, 
      passwd: this.passwd, 
      host: this.host, 
      port: this.port,
      amqpServer: this.amqpServer,
      queue: this.queue,
      exchange: this.exchange,
      routeKey: this.routeKey 
    };
  }
}
