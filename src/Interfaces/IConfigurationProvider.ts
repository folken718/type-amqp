import { IConfigurations } from './IConfigurations';

export interface IConfigurationProvider {
    getAmqpURL(): string;
    getHost(): string;
    getPort(): string;
    getQueue(): string;
    getExchange(): string;
    getRouteKey(): string;
    getConfigurations(): IConfigurations;
}