<script setup lang="ts">
import { getGameSlug, getScores, storagePathCorrection } from '@/api/games'
import SiteHeader from '@/components/SiteHeader.vue'
import Scores from '@/models/Scores'
import { GameSlug } from '@/models/games'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const loadingGame = ref(true)
const loadingScore = ref(true)
const game = ref(new GameSlug())
const scores = ref(new Scores())

watch(
  () => route.params.slug,
  async (newSlug) => {
    if (!newSlug) return
    loadingGame.value = true
    loadingScore.value = true
    game.value = await getGameSlug(newSlug as string)
    loadingGame.value = false
    scores.value = await getScores(newSlug as string)
    loadingScore.value = false
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
  <SiteHeader />
  <main>
    <div v-if="loadingGame">loading...</div>
    <div v-else>
      <h2>{{ game.title }}</h2>
      <iframe :src="storagePathCorrection(game.gamePath)">Game cound not be loaded</iframe>
    </div>
    <div class="bottom">
      <div class="leaderboard">
        <h3>Top 10 leaderboard</h3>
        <div v-if="loadingScore">loading...</div>
        <div v-else>
          <ul v-for="(score, idx) in scores.scores.slice(0, 10)" :key="score.timestamp">
            <li>
              <span># {{ idx + 1 }} {{ score.username }}</span>
              <span>{{ score.score }}</span>
            </li>
          </ul>
          <div class="player-score">
            <span>Hello</span>
            <span>3294</span>
          </div>
        </div>
      </div>
      <div class="description">
        <h3>Description</h3>
        <p v-if="loadingGame">loading...</p>
        <p v-else>{{ game.description }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  margin-bottom: 1rem;
  padding: 1rem;
}

iframe {
  display: flex;
  width: 100%;
  height: 500px;
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
