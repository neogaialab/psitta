<script setup lang="ts">
import { T, t } from '@psitta/vue'
import { store } from './main'
</script>

<template>
  <div>
    {{ t('Hello, {name}', { name: 'John' }) }}

    <T text="Hi, {name} {lastName}" :values="{ name: 'Motoko', lastName: 'Kusanagi' }">
      <template #name="slotProps">
        <span style="font-weight: 800;">{{ slotProps.name }}</span>
      </template>
      <template #lastName="slotProps">
        <span style="color: blue">{{ slotProps.lastName }}</span>
      </template>
    </T>

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
