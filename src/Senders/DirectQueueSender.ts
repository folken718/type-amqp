import * as connProvider from '../Connection/AmqpConnProvider';
const queue = process.env.QUEUE || 'ExampleQueue';
const msg = process.argv[2];

export const sendMessageDirectlyToQueue = async (queue: string, msg: string | ArrayBuffer): Promise<void> => {
  await connProvider.setupAndStartConnection();
  await connProvider.channel.assertQueue(queue, { durable: false });
  connProvider.channel.sendToQueue(queue, Buffer.from(msg));
};

(async () => {
  await sendMessageDirectlyToQueue(queue, msg);
  await connProvider.closeConnection();
})();
