import { useTokenStore } from '@/stores/counter'
import { myFetch } from './utils'

type UserOk = {
  username: string
  registeredTimestamp: string
  authoredGames: any[]
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

type UserError = {
  status: string
  message: string
}

export const getUser = async (): Promise<UserOk | UserError> => {
  const tokenStore = useTokenStore()
  if (!tokenStore.username) return { status: 'not-found', message: 'Not Found' }
  const res = await myFetch('/api/v1/users/' + tokenStore.username, 'GET')
  return await res.json()
}
