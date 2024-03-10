<script setup lang="ts">
import { deleteGameSlug, getGameSlug, postGameSlug, putGameSlug, uploadGame } from '@/api/games'
import AuthLayout from '@/components/AuthLayout.vue'
import Promise, { usePromise } from '@/components/Promise.vue'
import { GameSlug } from '@/models/games'
import router from '@/router'
import { useTokenStore } from '@/stores/counter'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tokenStore = useTokenStore()

const promise = usePromise<void>({ initiallyPending: false })
const formSubmission = usePromise<{
  success?: string
  err?: string
  titleErr?: string
  descriptionErr?: string
}>({ initiallyPending: false })
const uploadSubmission = usePromise<{
  success?: string
  err?: string
  zipfileErr?: string
}>({ initiallyPending: false })

const form = ref({ slug: '', title: '', description: '' })
const uploadForm = ref({ zipfile: undefined })

watch(
  () => route.params.slug,
  async (newSlug) => {
    // if (!tokenStore.token) {
    //   router.replace('/')
    //   return
    // }
    form.value = {
      slug: '',
      title: '',
      description: ''
    }
    if (!newSlug) return
    if (typeof newSlug !== 'string') return
    let g: GameSlug | undefined
    await promise.call(async () => {
      g = await getGameSlug(newSlug)
    })
    if (g?.author !== tokenStore.username) {
      router.replace('/')
      return
    }

    form.value = {
      slug: g?.slug ?? '',
      title: g?.title ?? '',
      description: g?.description ?? ''
    }
  },
  { immediate: true }
)

const onSubmit = () => {
  formSubmission.call(async () => {
    const ret = !form.value.slug
      ? await postGameSlug(form.value.title, form.value.description)
      : await putGameSlug(form.value.slug, form.value.title, form.value.description)
    if (ret.status == 'success') {
      if (!form.value.slug) router.replace('/manage/' + ret.slug)
      return {
        success: 'Succeeded'
      }
    }
    return {
      err: ret.message ?? ret.slug,
      titleErr: ret.violations?.title?.message,
      descriptionErr: ret.violations?.description?.message
    }
  })
}

const onDelete = () => {
  if (!form.value.slug) return
  if (!confirm('Are you sure you want to delete the game ' + form.value.title + '?')) return
  formSubmission.call(async () => {
    const ret = await deleteGameSlug(form.value.slug)
    if (ret.status == 'success') {
      router.replace('/users/' + tokenStore.username)
      return {}
    }
    return {
      err: ret.message
    }
  })
}

const onUpload = () => {
  uploadSubmission.call(async () => {
    const ret = await uploadGame(form.value.slug, uploadForm.value.zipfile as any)
    if (ret.status == 'success')
      return {
        success: 'Succeeded'
      }
    return {
      err: ret.message,
      zipfileErr: ret.violations?.zipfile?.message
    }
  })
}
</script>

<template>
  <main>
    <AuthLayout check>
      <template #guest>
        <h1 class="signin">
          Please <RouterLink :to="'/signin?redirect=' + $route.path">Sign In</RouterLink>
        </h1>
      </template>
      <Promise :promise="promise">
        <div class="container">
          <Promise :promise="formSubmission">
            <p class="success">{{ formSubmission.result?.success }}</p>
            <p>{{ formSubmission.result?.err }}</p>
            <label>
              Title:
              <input v-model="form.title" />
            </label>
            <p>{{ formSubmission.result?.titleErr }}</p>
            <label>
              Description:
              <textarea row="5" v-model="form.description"> </textarea>
            </label>
            <p>{{ formSubmission.result?.descriptionErr }}</p>
            <a href="#" @click.prevent="onSubmit">Submit</a>
            <a v-if="form.slug" href="#" @click.prevent="onDelete">Delete</a>
          </Promise>
        </div>
        <div v-if="form.slug" class="container">
          <Promise :promise="uploadSubmission">
            <p class="success">{{ uploadSubmission.result?.success }}</p>
            <p>{{ uploadSubmission.result?.err }}</p>
            <label>
              Game File:
              <input
                type="file"
                @change="(evt) => (uploadForm.zipfile = (evt.target as any)?.files?.[0])"
              />
            </label>
            <p>{{ uploadSubmission.result?.zipfileErr }}</p>
            <a href="#" @click.prevent="onUpload">Submit</a>
          </Promise>
        </div>
      </Promise>
    </AuthLayout>
  </main>
</template>

<style scoped>
.signin {
  text-align: center;
}

p {
  color: red;
}

.success {
  color: green;
}

.container {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 2px solid var(--color-border);
}

label {
  display: block;
}

textarea {
  width: 100%;
  min-height: 100px;
  resize: vertical;
  display: block;
}

/* img {
  width: 300px;
  height: 200px;
  object-fit: cover;
} */
</style>
