export enum MessageType {
  SHORT,
  MEDIUM,
  LONG,
  EMOTE
}

export enum ExtraType {
  SQUIGGLY,
  LOL,
  EXCLAMATION,
  QUESTION,
  PAUSE
}

export enum ExtraMode {
  START,
  END
}

export interface ExtraSound {
  src: string
  match: RegExp
  mode: ExtraMode
}

export interface Action {
  messageType: MessageType
  src: string
  ts: number
  extra: ExtraSound | null
}
