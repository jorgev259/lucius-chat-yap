import { ExtraMode, ExtraType, MessageType } from '../lib/types'

const audioSources = {
  message: {
    [MessageType.EMOTE]: [require('./message/emote.wav')],
    [MessageType.SHORT]: [
      require('./message/short1.wav'),
      require('./message/short2.wav'),
      require('./message/short3.wav')
    ],
    [MessageType.MEDIUM]: [
      require('./message/medium1.wav'),
      require('./message/medium2.wav'),
      require('./message/medium3.wav'),
      require('./message/medium4.wav'),
      require('./message/medium5.wav')
    ],
    [MessageType.LONG]: [
      require('./message/long1.wav'),
      require('./message/long2.wav'),
      require('./message/long3.wav')
    ]
  },
  extra: {
    [ExtraType.SQUIGGLY]: {
      src: require('./extra/squiggly.wav'),
      match: /~/g,
      mode: ExtraMode.END
    },
    [ExtraType.LOL]: {
      src: require('./extra/lol.wav'),
      match: /(lol|lmao|lmfao|rofl)/gi,
      mode: ExtraMode.END
    },
    [ExtraType.EXCLAMATION]: {
      src: require('./extra/exclamation.wav'),
      match: /!/g,
      mode: ExtraMode.START
    },
    [ExtraType.QUESTION]: {
      src: require('./extra/question.wav'),
      match: /\?/g,
      mode: ExtraMode.START
    },
    [ExtraType.PAUSE]: {
      src: require('./extra/pause.wav'),
      match: /(\.)\1+/g,
      mode: ExtraMode.START
    }
  }
}

export default audioSources
