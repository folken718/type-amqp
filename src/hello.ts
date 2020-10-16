import { InitConnection, channel, connection } from './Connections/Connection';

export function hello(): string {
    const hello = `hello world!!`;
    console.log(hello);
    return hello;
}

(async () => {
    InitConnection();
})();
