import { MessageType } from '../lib/types'

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
  }
}

export default audioSources
