import { useEffect, useRef } from 'react'
import { Client } from 'tmi.js'

import { getMessageType, randomItem } from './lib'
import { Action } from './lib/types'

import audioSources from './audio'

const messageGap = 1 * 1000

export default function Widget({
  username,
  filter
}: {
  username: string
  filter: string[]
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const queueRef = useRef<Action[]>([])

  useEffect(() => {
    const chatClient = new Client({ channels: [username] })
    chatClient.connect()

    chatClient.on('connected', () => console.log('Twitch Chat: connected'))
    chatClient.on('disconnected', () =>
      console.log('Twitch Chat: disconnnected')
    )
    chatClient.on('message', (channel, tags, message, self) => {
      const isFiltered =
        tags.username && filter.includes(tags.username.toLowerCase())
      if (self || isFiltered) return

      const messageType = getMessageType(tags, message)

      const src = randomItem<string>(audioSources.message[messageType])
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
  }, [username, filter])

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
