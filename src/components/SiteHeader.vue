<script setup lang="ts">
import { useTokenStore } from '@/stores/counter'
import AuthLayout from './AuthLayout.vue'

const tokenStore = useTokenStore()
</script>

<template>
  <header>
    <h1><RouterLink to="/">WorldSkills: Games</RouterLink></h1>
    <AuthLayout>
      <template v-slot:guest>
        <nav>
          <RouterLink to="/signup">Sign Up</RouterLink>
          <RouterLink to="/signin">Sign In</RouterLink>
        </nav>
      </template>
      <nav>
        <RouterLink :to="'/users/' + tokenStore.username">{{ tokenStore.username }}</RouterLink>
        <RouterLink to="/signout">Sign Out</RouterLink>
      </nav>
    </AuthLayout>
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
  border: 2px solid var(--color-border);
}

nav {
  display: flex;
  gap: 1rem;
}

.content {
  max-width: 960px;
  margin: 0 auto;
}
</style>
