<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import GameItem from '@/components/GameItem.vue'
import { getGames, storagePathCorrection } from '@/api/games'
import { Game } from '@/models/games'
import Promise, { usePromise } from '@/components/Promise.vue'

const pageSize = 5
const query = ref({ sortBy: 'title', sortDir: 'asc' })
const route = useRoute()
const games = ref<{ lastPage: number; content: Game[] }>({ lastPage: -1, content: [] })
const loadingGames = ref(true)
const numberOfGames = ref(0)

watch(
  () => route.query,
  async (newQuery) => {
    if (newQuery.sortBy) query.value.sortBy = newQuery.sortBy as string
    if (newQuery.sortDir) query.value.sortDir = newQuery.sortDir as string

    games.value = { lastPage: -1, content: [] }
    loadingGames.value = true
    const ret = await getGames(query.value.sortBy, query.value.sortDir, 0, pageSize)
    numberOfGames.value = ret.totalElements ?? 0
    games.value = {
      lastPage: ret.page ?? 0,
      content: ret.content
    }
    loadingGames.value = false
  },
  { immediate: true }
)

const onScroll = async () => {
  if (loadingGames.value) return
  if (
    document.documentElement.scrollTop + window.innerHeight <
    document.documentElement.offsetHeight
  )
    return
  if (games.value.content.length >= numberOfGames.value) return
  loadingGames.value = true
  const ret = await getGames(
    query.value.sortBy,
    query.value.sortDir,
    games.value.lastPage + 1,
    pageSize
  )
  games.value = {
    lastPage: ret.page ?? 0,
    content: games.value.content.concat(ret.content)
  }
  loadingGames.value = false
}

const getSearchRoute = (options: { by?: string; dir?: string }) =>
  `?sortBy=${options.by ?? query.value.sortBy}&sortDir=${options.dir ?? query.value.sortDir}`

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <main>
    <div class="title">
      <h2>{{ numberOfGames }} Games available</h2>
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
      <div class="container" v-for="game in games.content" :key="game.slug">
        <GameItem playable :game="game" :thumbnail="storagePathCorrection(game.thumbnail)" />
      </div>
      <div v-if="loadingGames">Loading...</div>
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
