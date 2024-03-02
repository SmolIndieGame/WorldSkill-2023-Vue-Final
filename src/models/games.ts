export default class Games {
  page?: number
  size?: number
  totalElements?: number
  content: Game[] = []
}

export class Game {
  title?: string
  slug?: string
  description?: string
  scoreCount?: number
  thumbnail?: string
  uploadTimestamp?: string
  author?: string
}

export class GameSlug {
  title?: string
  slug?: string
  description?: string
  thumbnail?: string
  uploadTimestamp?: string
  author?: string
  scoreCount?: number
  gamePath?: string
}
