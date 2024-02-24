<script setup lang="ts">
import { Game } from '@/models/games'

defineProps<{ game: Game; thumbnail?: string }>()
</script>

<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <h2>{{ game.title }}</h2>
        <h3>by {{ game.author }}</h3>
      </div>
      <div class="right"># scores submitted: {{ game.scoreCount }}</div>
    </div>
    <div class="bottom">
      <img :src="thumbnail ?? 'http://placeholder.com/600x400'" />
      <p>
        {{ game.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  border: 1px black solid;
  margin-bottom: 1rem;
  padding: 1rem;
}

.top {
  display: flex;
  justify-content: space-between;
}

.top .left {
  display: flex;
  align-items: end;
}

.bottom {
  display: flex;
}

img {
  width: 300px;
  height: 200px;
  object-fit: cover;
}

p {
  flex-grow: 1;
}
</style>
