import { useEffect, useRef } from 'react'
import { Client } from 'tmi.js'

import { randomItem } from './lib'
import { Action, MessageType } from './lib/types'

import audioSources from './audio'

const messageGap = 1 * 1000

export default function Widget({ username }: { username: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const usernameRef = useRef(username)
  const queueRef = useRef<Action[]>([])

  useEffect(() => {
    const chatClient = new Client({ channels: [usernameRef.current] })
    chatClient.connect()

    chatClient.on('connected', () => console.log('Twitch Chat: connected'))
    chatClient.on('disconnected', () =>
      console.log('Twitch Chat: disconnnected')
    )
    chatClient.on('message', (channel, tags, message, self) => {
      if (self) return

      let messageType: MessageType = MessageType.SHORT
      if (message.length > 30) messageType = MessageType.LONG
      else if (message.length > 16) messageType = MessageType.MEDIUM

      const src = randomItem(audioSources.message[messageType])
      const action: Action = { messageType, src, ts: Date.now() }

      queueRef.current.push(action)
      if (queueRef.current.length === 1) {
        if (!audioRef.current) return
        audioRef.current.src = action.src
      }

      console.log({ queue: queueRef.current })
    })

    return () => {
      chatClient.removeAllListeners()
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    const audioPlayer = audioRef.current

    function handleAudioEnd() {
      setTimeout(() => {
        queueRef.current = queueRef.current.slice(1)
        console.log({ queue: queueRef.current })

        if (queueRef.current.length > 0) {
          audioPlayer.src = queueRef.current[0].src
        }
      }, messageGap)
    }

    audioPlayer.addEventListener('ended', handleAudioEnd)

    return () => {
      audioPlayer.removeEventListener('ended', handleAudioEnd)
    }
  }, [])

  return (
    <div>
      <audio ref={audioRef} autoPlay />
    </div>
  )
}
