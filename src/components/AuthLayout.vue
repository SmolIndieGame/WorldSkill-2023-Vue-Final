<script setup lang="ts">
import { getUser } from '@/api/users'
import { useTokenStore } from '@/stores/counter'
import Promise, { usePromise } from './Promise.vue'

const props = defineProps<{ check?: boolean }>()

const tokenStore = useTokenStore()
const signedIn = usePromise<{ signedIn: boolean }>()

tokenStore.$subscribe(
  () => {
    signedIn.call(async () => {
      if (!tokenStore.username) return { signedIn: false }
      if (!props.check) return { signedIn: true }

      const res = await getUser(tokenStore.username)
      if ('message' in res) return { signedIn: false }
      return { signedIn: true }
    })
  },
  { immediate: true }
)
</script>
<template>
  <Promise :promise="signedIn">
    <template #pending>
      <slot name="pending"><p>Loading...</p></slot>
    </template>
    <template v-slot="{ result }">
      <slot v-if="!result.signedIn" name="guest"></slot>
      <slot v-else></slot>
    </template>
  </Promise>
</template>
<style scoped></style>
