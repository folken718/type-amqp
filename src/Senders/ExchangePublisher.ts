import * as connProvider from '../Connection/AmqpConnProvider';
const msg = process.argv[2];

export const sendMessage = async (queue: string, msg: string | ArrayBuffer): Promise<void> => {
  await connProvider.setupAndStartConnection();
  await connProvider.channel.assertExchange(connProvider.exchange, 'direct', { durable: false });
  connProvider.channel.publish(connProvider.exchange, connProvider.routeKey, Buffer.from(msg));
};

(async () => {
  await sendMessage(connProvider.queue, msg);
  await connProvider.closeConnection();
})();
