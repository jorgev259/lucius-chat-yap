export enum MessageType {
  SHORT = 'short',
  MEDIUM = 'medium',
  LONG = 'long'
}

export interface Action {
  messageType: MessageType
  src: any
  ts: number
}
