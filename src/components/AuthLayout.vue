<script setup lang="ts">
import { getUser } from '@/api/users'
import { useTokenStore } from '@/stores/counter'
import { ref } from 'vue'

const tokenStore = useTokenStore()
const signedin = ref(false)
tokenStore.$subscribe(
  async () => {
    if (!tokenStore.username) {
      signedin.value = false
      return
    }
    const res = await getUser()
    if ('status' in res) return
    signedin.value = res.username === tokenStore.username
  },
  { immediate: true }
)
</script>
<template>
  <slot v-if="!signedin" name="guest"></slot>
  <slot v-else></slot>
</template>
<style scoped></style>
