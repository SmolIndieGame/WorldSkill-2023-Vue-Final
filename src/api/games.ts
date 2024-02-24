import type Games from '@/models/games'

const host = 'http://localhost:8000/module_c_solution'

export const getGames = async (sortBy?: string, sortDir?: string) => {
  const query = `?sortBy=${sortBy}&sortDir=${sortDir}`
  const res = await fetch(host + '/api/v1/games' + query)
  return (await res.json()) as Games
}

export const thumbnailPathCorrection = (path: string) =>
  `${host}/storage/app/${path.replace(/demo-game-/, '')}`
