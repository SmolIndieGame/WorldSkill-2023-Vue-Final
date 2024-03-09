<script setup lang="ts">
import { useTokenStore } from '@/stores/counter'
import AuthLayout from './AuthLayout.vue'
import { signout } from '@/api/auth'
import router from '@/router'

const tokenStore = useTokenStore()
const signOut = async () => {
  const res = await signout()
  if (res.status === 'success') tokenStore.set('', '')
  router.push('/')
}
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
        <RouterLink to="/user">{{ tokenStore.username }}</RouterLink>
        <RouterLink to="/signout">Sign Out</RouterLink>
        <!-- <a href="#" @click.prevent="signOut">Sign Out</a> -->
        <!-- <RouterLink to="/signout">Sign Out</RouterLink> -->
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
  border: 1px solid black;
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
