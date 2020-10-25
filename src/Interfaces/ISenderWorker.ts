export interface ISenderWorker {
  send(msg: ArrayBuffer): void;
}