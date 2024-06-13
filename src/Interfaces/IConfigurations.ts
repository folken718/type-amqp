export interface IConfigurations {
    usr: string | undefined;
    passwd: string | undefined;
    host: string;
    port: number;
    amqpServer: string;
    queue: string;
    exchange: string;
    routeKey: string;
}