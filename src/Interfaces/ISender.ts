export interface ISender {
  sendMessage(queue: string, msg: ArrayBuffer): Promise<void>;
}
