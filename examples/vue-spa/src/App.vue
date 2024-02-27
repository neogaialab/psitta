<script setup lang="ts">
import { T, t } from '@psitta/vue'
import { store } from './main'
</script>

<template>
  <div>
    {{ t('Hello, {name}', { name: 'John' }) }}

    <T text="Hello, {name}" :values="{ name: 'John' }" />

    <div class="menu">
      <button @click="store.locale = 'pt'">
        Portuguese
      </button>
      <button @click="store.locale = 'en'">
        English
      </button>
    </div>
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  gap: 0.25em;
}
</style>
