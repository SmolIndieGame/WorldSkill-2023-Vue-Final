<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import GameItem from '@/components/GameItem.vue'
import { getGames, storagePathCorrection } from '@/api/games'
import Games from '@/models/games'

const numberOfGames = ref(0)
const query = ref({ sortBy: 'title', sortDir: 'asc' })
const route = useRoute()

const loadingGames = ref(true)
const games = ref(new Games())

watch(
  () => route.query,
  async (newQuery) => {
    if (newQuery.sortBy) query.value.sortBy = newQuery.sortBy as string
    if (newQuery.sortDir) query.value.sortDir = newQuery.sortDir as string

    loadingGames.value = true
    games.value = await getGames(query.value.sortBy, query.value.sortDir)
    numberOfGames.value = games.value.totalElements ?? 0
    loadingGames.value = false
  },
  { immediate: true }
)

const getSearchRoute = (options: { by?: string; dir?: string }) =>
  `?sortBy=${options.by ?? query.value.sortBy}&sortDir=${options.dir ?? query.value.sortDir}`

const getGame = async () => {
  alert('hi')
}
</script>

<template>
  <SiteHeader />
  <main>
    <div class="title">
      <h2>{{ numberOfGames }} Games available</h2>
      <div class="tabs">
        <RouterLink :to="getSearchRoute({ by: 'popular' })">Popularity</RouterLink>
        <RouterLink :to="getSearchRoute({ by: 'uploaddate' })">Recently Updated</RouterLink>
        <RouterLink :to="getSearchRoute({ by: 'title' })">Alphabetically</RouterLink>
      </div>
      <div class="tabs">
        <RouterLink :to="getSearchRoute({ dir: 'asc' })">ASC</RouterLink>
        <RouterLink :to="getSearchRoute({ dir: 'desc' })">DESC</RouterLink>
      </div>
    </div>
    <div class="content">
      <div v-if="!loadingGames">
        <div class="container" v-for="game in games.content" :key="game.slug">
          <GameItem
            :game="game"
            :thumbnail="storagePathCorrection(game.thumbnail)"
            :slugLink="game.slug"
          />
        </div>
      </div>
      <div v-else>Loading...</div>
    </div>
  </main>
</template>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title .tabs {
  display: flex;
  gap: 0.2rem;
}
</style>
