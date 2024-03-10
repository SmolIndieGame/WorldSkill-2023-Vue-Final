<script setup lang="ts">
import { ref } from 'vue'
import { signIn, signUp } from '@/api/auth'
import { useTokenStore } from '@/stores/counter'
import SiteHeader from '@/components/SiteHeader.vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import Promise, { usePromise } from '@/components/Promise.vue'

const props = defineProps<{ action: 'signup' | 'signin' }>()
const route = useRoute()

const username = ref('')
const password = ref('')

const promise = usePromise<{
  err?: string
  usernameErr?: string
  passwordErr?: string
}>({ initiallyPending: false })

const onSubmit = async () => {
  await promise.call(async () => {
    const res =
      props.action === 'signup'
        ? await signUp(username.value, password.value)
        : await signIn(username.value, password.value)

    if (res.status == 'success') {
      useTokenStore().set(username.value, res.token)
      const redirect = route.query.redirect ?? '/'
      const to = typeof redirect === 'string' ? redirect : '/'
      router.push({ path: to })
      return {}
    }
    return {
      err: res.message,
      usernameErr: res.violations?.username?.message,
      passwordErr: res.violations?.password?.message
    }
  })
}
</script>

<template>
  <main>
    <div>
      <h1>{{ action === 'signin' ? 'Sign In' : 'Sign Up' }}</h1>
      <Promise :promise="promise">
        <form @submit.prevent="onSubmit">
          <p v-if="promise.result?.err">{{ promise.result.err }}</p>
          <label>
            username:
            <input v-model="username" />
          </label>
          <p v-if="promise.result?.usernameErr">{{ promise.result?.usernameErr }}</p>
          <label>
            password:
            <input type="password" v-model="password" />
          </label>
          <p v-if="promise.result?.passwordErr">{{ promise.result?.passwordErr }}</p>
          <input type="submit" value="Go" />
        </form>
        <div v-if="action === 'signin'">
          No account? <RouterLink to="/signup">Sign Up</RouterLink>
        </div>
        <div v-else>Already has an account? <RouterLink to="/signin">Sign In</RouterLink></div>
      </Promise>
    </div>
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

p {
  color: red;
}

label {
  display: block;
}
</style>
