import { IConfigurationProvider } from "../Interfaces/IConfigurationProvider";
import { IConfigurations } from "../Interfaces/IConfigurations";

export class ManualConfigurationProvider implements IConfigurationProvider{
  usr: string
  passwd: string
  host: string;
  port: number;
  amqpServer: string;
  queue: string;
  exchange: string;
  routeKey: string;

  constructor (
    user: string, 
    password: string, 
    host: string, 
    port: number, 
    queue: string, 
    exchange: string, 
    routeKey: string
  ) {
    this.usr = user;
    this.passwd = password;
    this.host = host;
    this.port = port;
    this.queue = queue;
    this.exchange = exchange;
    this.routeKey = routeKey;
    this.amqpServer = `amqp://${this.usr}:${this.passwd}@${this.host}:${this.port.toString()}`
  }

  getAmqpURL(): string {
    return this.amqpServer;
  }
  getHost(): string {
    return this.host;
  }
  getPort(): number {
    return this.port;
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