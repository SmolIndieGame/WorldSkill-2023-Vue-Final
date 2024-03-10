<script setup lang="ts">
import { Game } from '@/models/games'
import { RouterLink } from 'vue-router'

defineProps<{ game: Game; thumbnail?: string; hideAuthor?: boolean; manageable?: boolean }>()
defineEmits<{ titleClick: [] }>()
</script>

<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <h2 v-if="game.slug">
          <RouterLink :to="'/games/' + game.slug">{{ game.title }}</RouterLink>
        </h2>
        <h2 v-else>{{ game.title }}</h2>
        <h3 v-if="!hideAuthor">
          by <RouterLink :to="'/users/' + game.author">{{ game.author }}</RouterLink>
        </h3>
        <h3 v-if="manageable">
          &nbsp;<RouterLink :to="'/manage/' + game.slug">Manage</RouterLink>
        </h3>
      </div>
      <div class="right"># scores submitted: {{ game.scoreCount }}</div>
    </div>
    <div class="bottom">
      <img
        :src="thumbnail ?? 'http://placeholder.com/600x400'"
        :alt="'thumbnail for game ' + game.title"
      />
      <p>
        {{ game.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  border: 2px var(--color-border) solid;
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
