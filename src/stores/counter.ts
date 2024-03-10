import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore(
  'token',
  () => {
    const username = ref(localStorage.getItem('username') ?? '')
    const token = ref(localStorage.getItem('token') ?? '')
    const set = (newUsername: string, newToken: string) => {
      username.value = newUsername
      token.value = newToken
      localStorage.setItem('username', newUsername)
      localStorage.setItem('token', newToken)
    }
    return { username, token, set }
  },
  {}
)

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
