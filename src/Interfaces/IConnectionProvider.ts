import { Channel, ConfirmChannel, Connection } from "amqplib";
import { Interface } from "readline";
import { IConfigurationProvider } from "./IConfigurationProvider";

export interface IConnetionProvider {
  getConfigurations(): IConfigurationProvider
  getConnection(): Connection | undefined
  getChannel(): Channel | undefined;
  getConfirmChannel(): ConfirmChannel | undefined;
  closeConnection(): void;
}