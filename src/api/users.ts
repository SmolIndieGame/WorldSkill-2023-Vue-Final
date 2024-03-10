import { useTokenStore } from '@/stores/counter'
import { myFetch } from './utils'

export type User = {
  username: string
  registeredTimestamp: string
  authoredGames: {
    title: string
    slug: string
    description: string
    thumbnail?: string
  }[]
  highscores: {
    game: {
      slug: string
      title: string
      description: string
    }
    score: number
    timestamp: string
  }[]
}

export type GetUserError = {
  status: string
  message: string
}

export const getUser = async (name: string): Promise<User | GetUserError> => {
  // if (!tokenStore.username) return { status: 'not-found', message: 'Not Found' }
  const res = await myFetch('/api/v1/users/' + name, 'GET')
  return await res.json()
}
