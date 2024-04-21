import type { ChatUserstate } from 'tmi.js'

import audioSources from '../audio'
import { MessageType } from './types'

const extraSounds = audioSources.extra

export const randomItem = <T>(array: T[]) =>
  array[Math.floor(Math.random() * array.length)]

export function checkEmoteOnly(tags: ChatUserstate, message: string) {
  if (tags['emote-only']) return true

  const { emotes } = tags
  if (!emotes) return false

  // Array of strings indicating at which indexes emotes exist in the message
  const emoteIndexes = Object.values(emotes).flat()

  // Remove any character that matches an emote position in the message
  let parsedMessage = Array.from(message)
    .filter((_, index) => {
      const matchEmote = emoteIndexes.find((emote) => {
        const [start, end] = emote.split('-').map((v) => parseInt(v))
        return index >= start && index <= end
      })

      if (matchEmote) return false
      else return true
    })
    .join('')

  return parsedMessage.length === 0
}

export function getMessageType(tags: ChatUserstate, message: string) {
  if (checkEmoteOnly(tags, message)) return MessageType.EMOTE

  if (message.length > 30) return MessageType.LONG
  if (message.length > 16) return MessageType.MEDIUM
  return MessageType.SHORT
}

