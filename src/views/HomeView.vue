<script setup lang="ts">
import { useRoute } from 'vue-router'
import TheWelcome from '../components/TheWelcome.vue'
import GameList from './GameList.vue';

defineProps<{
  numberOfGames: number
}>()
const route = useRoute()
route.query
</script>

<template>
  <main>
    <div class="title">
      <h2>{{ numberOfGames }} Games available</h2>
      <div class="tabs">
        <RouterLink to="">Popularity</RouterLink>
        <RouterLink to="">Recently Updated</RouterLink>
        <RouterLink to="">Alphabetically</RouterLink>
      </div>
      <div class="tabs">
        <RouterLink to="">ASC</RouterLink>
        <RouterLink to="">DESC</RouterLink>
      </div>
    </div>
    <div class="content">
      <Suspense>
        <GameList></GameList>
      </Suspense>
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
