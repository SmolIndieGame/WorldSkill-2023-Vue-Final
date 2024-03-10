<script setup lang="ts">
import { getUser, type User } from '@/api/users'
import AuthLayout from '@/components/AuthLayout.vue'
import PromiseVue, { usePromise } from '@/components/Promise.vue'
import { useRoute } from 'vue-router'
import { getGameSlug, storagePathCorrection } from '@/api/games'
import GameItem from '@/components/GameItem.vue'
import { GameSlug } from '@/models/games'
import { watch } from 'vue'
import { useTokenStore } from '@/stores/counter'

const user = usePromise<{ user: User; games: GameSlug[] }>()
const route = useRoute()
const tokenStore = useTokenStore()
watch(
  () => route.params.user,
  () =>
    user.call(async () => {
      if (!route.params.user || typeof route.params.user !== 'string') throw undefined
      const user = await getUser(route.params.user)
      if ('message' in user) throw new Error('get user failed')
      const gamesPromise = [] as Promise<GameSlug>[]
      for (const game of user.authoredGames) {
        gamesPromise.push(getGameSlug(game.slug))
      }
      const games = await Promise.all(gamesPromise)
      console.log(games)
      return { user, games }
    }),
  { immediate: true }
)
</script>
<template>
  <main>
    <AuthLayout check>
      <template #guest>
        <h1 class="signin">
          Please <RouterLink :to="'/signin?redirect=' + useRoute().path">Sign In</RouterLink>
        </h1>
      </template>
      <PromiseVue :promise="user">
        <template v-slot="{ result }">
          <h2>{{ result.user.username }}</h2>
          <div v-if="result.games.length > 0">
            <h3>Authored Games</h3>
            <div v-for="game in result.games" :key="game.slug">
              <GameItem
                :playable="game.gamePath ? true : false"
                hide-author
                :manageable="result.user.username === tokenStore.username"
                :game="game"
                :thumbnail="storagePathCorrection(game.thumbnail)"
              />
            </div>
          </div>
          <div v-if="result.user.username === tokenStore.username">
            <RouterLink to="/manage">New Game</RouterLink>
          </div>
          <div v-if="result.user.highscores.length > 0">
            <h3>Highscores Per Game</h3>
            <ul v-for="score in result.user.highscores" :key="score.game.slug">
              <li>
                <RouterLink :to="'/games/' + score.game.slug">{{ score.game.title }}</RouterLink>
                <span>{{ score.score }}</span>
              </li>
            </ul>
          </div>
        </template>
      </PromiseVue>
    </AuthLayout>
  </main>
</template>
<style scoped>
ul {
  padding: 0;
  list-style-type: none;
}

li {
  display: flex;
  justify-content: space-between;
}
.signin {
  text-align: center;
}
</style>
