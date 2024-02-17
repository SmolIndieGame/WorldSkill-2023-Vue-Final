<script setup lang="ts">
import { ref } from 'vue'
import Games from '@/models/games'

console.log("hi")
const res = await fetch('127.0.0.1:18000/module_c_solution/api/v1/games')
const games = (await res.json()) as Games
</script>

<template>
  <div v-for="game in games.content" :key="game.slug">
    <div class="top">
      <h2>{{ game.title }}</h2>
      <h3>by {{ game.author }}</h3>
      <div># scores submitted: {{ game.scoreCount }}</div>
    </div>
    <div>
      <img :src="game.thumbnail">
      <p>
        {{ game.description }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
