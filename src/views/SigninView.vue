<script setup lang="ts">
import { ref } from 'vue'
import { signin, signup } from '@/api/auth'
import { useTokenStore } from '@/stores/counter'
import SiteHeader from '@/components/SiteHeader.vue'
import router from '@/router'
import { useRoute } from 'vue-router'

const props = defineProps<{ action: 'signup' | 'signin' }>()
const route = useRoute()

const username = ref('')
const password = ref('')

const err = ref<string>()
const usernameErr = ref<string>()
const passwordErr = ref<string>()

const onSubmit = async () => {
  const res =
    props.action === 'signup'
      ? await signup(username.value, password.value)
      : await signin(username.value, password.value)

  if (res.status == 'success') {
    useTokenStore().set(username.value, res.token)
    const redirect = route.query.redirect ?? '/'
    const to = typeof redirect === 'string' ? redirect : '/'
    router.push({ path: to })
    return
  }
  usernameErr.value = res.violations?.username?.message
  passwordErr.value = res.violations?.password?.message
  err.value = res.message
}
</script>

<template>
  <SiteHeader />
  <main>
    <h1>{{ action === 'signin' ? 'Sign In' : 'Sign Up' }}</h1>
    <form @submit.prevent="onSubmit">
      <p v-if="err">{{ err }}</p>
      <label>
        username:
        <input v-model="username" />
      </label>
      <p v-if="usernameErr">{{ usernameErr }}</p>
      <label>
        password:
        <input type="password" v-model="password" />
      </label>
      <p v-if="passwordErr">{{ passwordErr }}</p>
      <input type="submit" value="Go" />
    </form>
    <div v-if="action === 'signin'">No account? <RouterLink to="/signup">Sign Up</RouterLink></div>
    <div v-else>Already has an account? <RouterLink to="/signin">Sign In</RouterLink></div>
  </main>
</template>

<style scoped>
p {
  color: red;
}
label {
  display: block;
}
</style>
