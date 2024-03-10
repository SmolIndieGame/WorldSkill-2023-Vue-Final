<script setup lang="ts">
import { signOut } from '@/api/auth'
import Promise, { usePromise } from '@/components/Promise.vue'
import { useTokenStore } from '@/stores/counter'

const tokenStore = useTokenStore()
const out = usePromise<void>()
out.call(async () => {
  console.log('hi')
  if (!tokenStore.username) return
  const res = await signOut()
  if (res.status === 'success') tokenStore.set('', '')
})
</script>

<template>
  <main>
    <Promise :promise="out">
      <div>Signed Out</div>
      <div>
        <RouterLink to="/">Go back to Main Page</RouterLink>
      </div>
    </Promise>
  </main>
</template>

<style scoped>
main {
  display: flex;
  min-height: 50vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px var(--color-border) solid;
  box-sizing: border-box;
}
</style>
