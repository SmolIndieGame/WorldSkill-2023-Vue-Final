<script setup lang="ts">
import { getGameSlug, getScores, storagePathCorrection } from '@/api/games'
import { getUser } from '@/api/users'
import AuthLayout from '@/components/AuthLayout.vue'
import Promise, { usePromise } from '@/components/Promise.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import Scores from '@/models/Scores'
import { GameSlug } from '@/models/games'
import { useTokenStore } from '@/stores/counter'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tokenStore = useTokenStore()

const game = usePromise<GameSlug>()
const scores = usePromise<Scores>()
const user = usePromise<{ username: string; userScore: number | undefined }>()

// const loadingGame = ref(true)
// const loadingScore = ref(true)
// const game = ref(new GameSlug())
// const scores = ref(new Scores())
// const username = ref('')
// const userScore = ref<number>()

watch(
  () => route.params.slug,
  async (newSlug) => {
    if (!newSlug) return
    if (typeof newSlug !== 'string') return
    scores.call(async () => {
      return getScores(newSlug)
    })
    await game.call(async () => {
      return getGameSlug(newSlug)
    })
    user.call(async () => {
      const res = await getUser(tokenStore.username)
      if ('message' in res) throw new Error('get user failed')
      return {
        username: res.username,
        userScore: res.highscores.find((x) => x.game.slug === game.result?.slug)?.score
      }
    })
  },
  { immediate: true }
)

window.addEventListener('message', (message) => {
  if (message.data.event_type !== 'game_run_end') return
  if (confirm('Do you want to submit your score? (' + message.data.score + ')'))
    alert('score submitted')
})
</script>

<template>
  <main>
    <AuthLayout check>
      <template #guest>
        <h1 class="signin">
          Please <RouterLink :to="'/signin?redirect=' + useRoute().path">Sign In</RouterLink>
        </h1>
      </template>
      <Promise :promise="game">
        <h2>{{ game.result?.title }}</h2>
        <iframe :src="storagePathCorrection(game.result?.gamePath)"
          >Game cound not be loaded</iframe
        >
      </Promise>
      <div class="bottom">
        <div class="leaderboard">
          <h3>Top 10 leaderboard</h3>
          <Promise :promise="scores">
            <template v-slot="{ result }">
              <ul v-for="(score, idx) in result.scores.slice(0, 10)" :key="score.timestamp">
                <li>
                  <span># {{ idx + 1 }} {{ score.username }}</span>
                  <span>{{ score.score }}</span>
                </li>
              </ul>
              <Promise :promise="user">
                <div v-if="user.result?.userScore" class="player-score">
                  <span>{{ user.result.username }}</span>
                  <span>{{ user.result.userScore }}</span>
                </div>
              </Promise>
            </template>
          </Promise>
        </div>
        <div class="description">
          <h3>Description</h3>
          <Promise :promise="game">
            <p>{{ game.result?.description }}</p>
          </Promise>
        </div>
      </div>
    </AuthLayout>
  </main>
</template>

<style scoped>
.signin {
  text-align: center;
}
main {
  margin-bottom: 1rem;
  padding: 1rem;
}

iframe {
  display: flex;
  width: 100%;
  height: 500px;
  border: 2px solid var(--color-border);
  background-color: #eee;
}

img {
  width: 300px;
  height: 200px;
  object-fit: cover;
}

.bottom {
  display: flex;
  gap: 32px;
}

.bottom > div {
  flex-grow: 1;
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  display: flex;
  justify-content: space-between;
}

.player-score {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}

.player-score > span:nth-child(1) {
  font-weight: bold;
}
</style>
