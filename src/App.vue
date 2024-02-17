<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'
</script>

<template>
  <div class="top">
    <h1>WorldSkills: Games</h1>
    <div>
      <RouterLink to="">Sign Up</RouterLink>
      <RouterLink to="">Sign In</RouterLink>
    </div>
  </div>
  <div class="content">
    <HomeView :number-of-games="567" />
  </div>
</template>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.top h1 {
  margin: 1.5rem;
  padding: 0.5rem 1.5rem;
  border: 1px solid black;
}

.top div {
  display: flex;
  gap: 1rem;
}

.content {
  max-width: 960px;
  margin: 0 auto;
}
</style>
