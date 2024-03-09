import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
  const username = ref('')
  const token = ref('')
  const set = (newUsername: string, newToken: string) => {
    username.value = newUsername
    token.value = newToken
  }
  return { username, token, set }
})

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
