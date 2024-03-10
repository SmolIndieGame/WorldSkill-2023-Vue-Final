<script lang="ts">
export class PromiseHandler<T> {
  private _pending: Ref<boolean>
  public get pending(): boolean {
    return this._pending.value
  }

  private _result: Ref<T | undefined>
  public get result(): T | undefined {
    return this._result.value
  }

  private _error: Ref<unknown>
  public get error(): unknown {
    return this._error.value
  }

  constructor(loading: boolean) {
    this._pending = ref(loading)
    this._result = ref<T>()
    this._error = ref<Error>()
  }

  async call(action: () => Promise<T>) {
    this._pending.value = true
    try {
      this._result.value = await action()
    } catch (error) {
      this._error.value = error
    } finally {
      this._pending.value = false
    }
  }
}
export const usePromise = <T,>(options: { initiallyPending?: boolean } = {}) => {
  return new PromiseHandler<T>(options?.initiallyPending ?? true)
}
</script>

<script setup lang="ts" generic="T">
import { ref, type Ref } from 'vue'

const props = defineProps<{ promise: PromiseHandler<T> }>()
</script>

<template>
  <slot name="error" v-if="props.promise.error" :error="props.promise.error">
    <p>error</p>
  </slot>
  <slot name="pending" v-else-if="props.promise.pending">
    <p>Loading...</p>
  </slot>
  <slot v-else :result="props.promise.result!"> </slot>
</template>

<style scoped></style>
