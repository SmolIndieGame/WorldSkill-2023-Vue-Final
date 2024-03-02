import type Scores from '@/models/Scores'
import type { GameSlug } from '@/models/games'
import type Games from '@/models/games'

const host = 'http://localhost:8000/module_c_solution'

export const storagePathCorrection = (path?: string) =>
  path ? `${host}/storage/app/${path.replace(/demo-game-/, '')}` : undefined

export const getGames = async (sortBy?: string, sortDir?: string) => {
  const query = `?sortBy=${sortBy}&sortDir=${sortDir}`
  const res = await fetch(host + '/api/v1/games' + query)
  return (await res.json()) as Games
}

export const getGameSlug = async (slugName?: string) => {
  const res = await fetch(host + '/api/v1/games/' + slugName)
  return (await res.json()) as GameSlug
}

export const getScores = async (slugName?: string) => {
  const res = await fetch(host + '/api/v1/games/' + slugName + '/scores')
  return (await res.json()) as Scores
}
