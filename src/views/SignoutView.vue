<script setup lang="ts">
import { signout } from '@/api/auth'
import router from '@/router'
import { useTokenStore } from '@/stores/counter'

const tokenStore = useTokenStore()
const signOut = async () => {
  const res = await signout()
  if (res.status === 'success') tokenStore.set('', '')
  //   router.push('/')
}
if (!tokenStore.username) await signOut()
</script>
<template>
  <Suspense>
    <template v-slot:fallback> loading </template>
    <div>Signed Out</div>
    <div>
      <RouterLink to="/">Go back to Main Page</RouterLink>
    </div>
  </Suspense>
</template>
