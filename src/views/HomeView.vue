<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import GameItem from '@/components/GameItem.vue'
import { getGames, storagePathCorrection } from '@/api/games'
import Games from '@/models/games'
import Promise, { usePromise } from '@/components/Promise.vue'

const query = ref({ sortBy: 'title', sortDir: 'asc' })
const route = useRoute()
const games = usePromise<Games>()

watch(
  () => route.query,
  async (newQuery) => {
    if (newQuery.sortBy) query.value.sortBy = newQuery.sortBy as string
    if (newQuery.sortDir) query.value.sortDir = newQuery.sortDir as string

    await games.call(async () => {
      return await getGames(query.value.sortBy, query.value.sortDir)
    })
  },
  { immediate: true }
)

const getSearchRoute = (options: { by?: string; dir?: string }) =>
  `?sortBy=${options.by ?? query.value.sortBy}&sortDir=${options.dir ?? query.value.sortDir}`
</script>

<template>
  <main>
    <div class="title">
      <Promise :promise="games">
        <h2>{{ games.result?.totalElements }} Games available</h2>
      </Promise>
      <div class="tabs">
        <RouterLink
          :class="{ highlight: query.sortBy === 'popular' }"
          :to="getSearchRoute({ by: 'popular' })"
          >Popularity</RouterLink
        >
        <RouterLink
          :class="{ highlight: query.sortBy === 'uploaddate' }"
          :to="getSearchRoute({ by: 'uploaddate' })"
          >Recently Updated</RouterLink
        >
        <RouterLink
          :class="{ highlight: query.sortBy === 'title' }"
          :to="getSearchRoute({ by: 'title' })"
          >Alphabetically</RouterLink
        >
      </div>
      <div class="tabs">
        <RouterLink
          :class="{ highlight: query.sortDir === 'asc' }"
          :to="getSearchRoute({ dir: 'asc' })"
          >ASC</RouterLink
        >
        <RouterLink
          :class="{ highlight: query.sortDir === 'desc' }"
          :to="getSearchRoute({ dir: 'desc' })"
          >DESC</RouterLink
        >
      </div>
    </div>
    <div class="content">
      <Promise :promise="games">
        <div class="container" v-for="game in games.result?.content" :key="game.slug">
          <GameItem :game="game" :thumbnail="storagePathCorrection(game.thumbnail)" />
        </div>
      </Promise>
    </div>
  </main>
</template>

<style scoped>
.highlight {
  background-color: hsla(160, 100%, 37%, 0.2) !important;
}

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
