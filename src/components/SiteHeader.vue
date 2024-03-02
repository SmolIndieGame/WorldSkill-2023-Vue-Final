<script setup lang="ts"></script>

<template>
  <header>
    <h1><RouterLink to="">WorldSkills: Games</RouterLink></h1>
    <div>
      <RouterLink to="">Sign Up</RouterLink>
      <RouterLink to="">Sign In</RouterLink>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

header h1 {
  margin: 1.5rem;
  padding: 0.5rem 1.5rem;
  border: 1px solid black;
}

header div {
  display: flex;
  gap: 1rem;
}

.content {
  max-width: 960px;
  margin: 0 auto;
}
</style>
