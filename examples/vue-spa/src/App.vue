<script setup lang="ts">
import { T, dn, t, u, useLocale, v } from '@psitta/vue'
import { defineValue, getConfig } from '@psitta/core'
import { ref } from 'vue'

const config = getConfig()
const count = ref(0)
const currentLocale = useLocale()

const now = defineValue([new Date(), { dateStyle: 'short' }])
</script>

<template>
  {{ t('Hello {name}', { name: 'Batou' }) }}

  <div style="display: flex; gap: 2em">
    <T text="I have {num} (apple|apples)" :context="{ num: count }">
      <template #num="{ inflect }">
        <span className="count">{{ count }}</span> {{ inflect(count) }}
      </template>
    </T>

    <button @click="count++">
      Add apple
    </button>
  </div>

  <p>
    {{ v(now) }}
  </p>

  <p>
    {{ t('Today is {date}', {
      date: new Date(),
    }) }}
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
