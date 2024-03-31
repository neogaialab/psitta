<script setup lang="ts">
import { T, dn, t, u, useLocale, v } from '@psitta/vue'
import { getConfig } from '@psitta/core'
import { ref } from 'vue'

const config = getConfig()
const count = ref(0)
const currentLocale = useLocale()
</script>

<template>
  {{ t('Hello {name}', { name: 'Batou' }) }}

  <div style="display: flex; gap: 2em">
    <T text="I have {num} (apple|apples)" :values="{ num: count }">
      <template #num="{ decline }">
        <span className="count">{{ count }}</span> {{ decline(count) }}
      </template>
    </T>

    <button @click="count++">
      Add apple
    </button>
  </div>

  <p>
    {{ v([new Date(), { dateStyle: 'long' }]) }}
  </p>

  <div style="display: flex; margin-bottom: 0.5em; margin-top: 0.5em">
    <button v-for="locale in config.locales" :key="locale" @click="currentLocale = locale">
      {{ dn(locale, { type: 'language' }, { locale }) }}
    </button>
  </div>

  <a :href="u('/product/{name}', { name: 'Futuristic Hoverboard' })">
    Localized link
  </a>
</template>
