import type Scores from '@/models/Scores'
import type { GameSlug } from '@/models/games'
import type Games from '@/models/games'
import { host, myFetch } from './utils'

export const storagePathCorrection = (path?: string) =>
  path ? `${host}/storage/app/${path.replace(/demo-game-/, '')}` : undefined

export const getGames = async (sortBy?: string, sortDir?: string) => {
  const query = `?sortBy=${sortBy}&sortDir=${sortDir}`
  const res = await myFetch('/api/v1/games' + query, 'GET')
  return (await res.json()) as Games
}

export const getGameSlug = async (slugName?: string) => {
  const res = await myFetch('/api/v1/games/' + slugName, 'GET')
  return (await res.json()) as GameSlug
}

export const getScores = async (slugName?: string) => {
  const res = await myFetch('/api/v1/games/' + slugName + '/scores', 'GET')
  return (await res.json()) as Scores
}
