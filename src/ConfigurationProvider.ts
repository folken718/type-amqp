import * as dotenv from 'dotenv';
import { Configurations } from './Interfaces/IConfigurations';
dotenv.config();



const amqpServer = `amqp://${process.env.AMQP_HOST}:${process.env.AMQP_PORT}` || 'amqp://localhost:5672';
const queue = process.env.QUEUE || 'ExampleQueue';
const exchange = process.env.EXCHANGE || 'ExampleExchange';
const routeKey = process.env.ROUTE_KEY || 'xyz';

export const provideConfigurations = (): Configurations => {
  return { amqpServer: amqpServer, queue: queue, exchange: exchange, routeKey: routeKey };
};
