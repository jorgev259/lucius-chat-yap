export enum MessageType {
  SHORT,
  MEDIUM,
  LONG,
  EMOTE
}

export interface Action {
  messageType: MessageType
  src: string
  ts: number
}
