import { Channel } from 'amqplib';
import { MessageProcessorType } from '../Enums/MessageProcessorsType';
import { ConsoleOutputMessageProcessor } from "../MessageProcessors/ConsoleOutputMessageProcessor";

export class MessageProcessorFactory {
    static getMessageProcesor(type: MessageProcessorType, consumerId: string, channel: Channel) {
        switch (type) {
            case 'CONSOLE_OUTPUT':
                return new ConsoleOutputMessageProcessor(consumerId, channel);
            default:
                return new ConsoleOutputMessageProcessor(consumerId, channel);
        }
    }
}