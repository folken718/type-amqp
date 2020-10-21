import * as dotenv from 'dotenv';
dotenv.config();

interface Configurations {
  amqpServer: string;
  queue: string;
  exchange: string;
  routeKey: string;
}

const amqpServer = `amqp://${process.env.AMQP_HOST}:${process.env.AMQP_PORT}` || 'amqp://localhost:5672';
const queue = process.env.QUEUE || 'ExampleQueue';
const exchange = process.env.EXCHANGE || 'ExampleExchange';
const routeKey = process.env.ROUTE_KEY || 'xyz';

const getConfigurations = (): Configurations => {
  return { amqpServer: this.amqpServer, queue: this.queue, exchange: this.exchange, routeKey: this.routeKey };
};
