import { Connection, Channel, ConfirmChannel, connect } from "amqplib";
import { IConfigurationProvider } from "../Interfaces/IConfigurationProvider";
import { IConnetionProvider } from "../Interfaces/IConnectionProvider";

export class ConnectionProvider implements IConnetionProvider{
  configurations: IConfigurationProvider;
  connnection: Connection | undefined = undefined;
  channel: Channel | undefined = undefined;
  confirmChannel: ConfirmChannel | undefined;

  constructor(configurations: IConfigurationProvider) {
    this.configurations = configurations;
  }

  async init(): Promise<void> {
    try {
      const conn = await connect(this.configurations.getAmqpURL());
      const channel = await conn.createChannel();
      const confirmChannel = await conn.createConfirmChannel();
  
      channel.on('close', () => {
        console.log('Closing channel');
      });
  
      channel.on('error', (error) => {
        console.error('Channel Error: ', error);
      });
  
      conn.on('close', (error) => {
        if (error) console.error(`There was and error in the connection: ${error}`);
        console.log('Closing connection...');
      });
  
      conn.on('error', (error) => {
        if (error) console.error(`There was and error in the connection: ${error}`);
      });

      this.connnection = conn;
      this.channel = channel;
      this.confirmChannel = confirmChannel;

    } catch (error) {
      console.log('Connection Error', error);
    }
  }

  getConnection(): Connection | undefined{
   return this.connnection; 
  }
  getChannel(): Channel | undefined {
    return this.channel;
  }
  getConfirmChannel(): ConfirmChannel | undefined {
    return this.confirmChannel;
  }
  getConfigurations(): IConfigurationProvider {
    return this.configurations;
  }
  closeConnection(): void {
    if (typeof this.connnection === 'undefined') {
      throw new Error('Connection is undefined')
    } else {
      this.connnection.close()
    };
  }
}