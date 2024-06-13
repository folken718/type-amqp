import { IConfigurations } from './IConfigurations';

export interface IConfigurationProvider {
    getAmqpURL(): string;
    getHost(): string;
    getPort(): number;
    getQueue(): string;
    getExchange(): string;
    getRouteKey(): string;
    getConfigurations(): IConfigurations;
}