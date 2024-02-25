<script
  setup
  lang="ts"
  generic="T extends Key & keyof Psitta.MessageSchema, V extends InferValues<T | EveryTranslationOf<T>>"
>
import { computed, onMounted, useSlots } from 'vue'
import { collect, formatToSegments, getConfig, getFormatOptions, localizeKey } from '@psitta/core'
import type { FormatContext, InferValues, Key, Psitta, Values } from '@psitta/core'
import useLocale from '../composables/useLocale'

export type ValueOf<T> = T[keyof T]

export type EveryTranslationOf<D extends string & keyof Psitta.MessageSchema> = Extract<
  ValueOf<Psitta.MessageSchema[D]>,
  string
>

const props = withDefaults(
  defineProps<{
    text: T
    values?: Partial<V>
    tag?: string
  }>(),
  { tag: 'span' },
)

defineSlots<Slots>()

type Placeholders = InferValues<typeof props.text>
type SlotProps = V & { decline: FormatContext<any>['decline'] }
type Slots = Record<keyof Placeholders, (slotProps: SlotProps) => any>

const slots = useSlots()

const values = props.values || {}
const options = getConfig()
const locale = useLocale()

const segments = computed(() => {
  const localeValue = locale.value
  const text = localizeKey(props.text, localeValue, options)
  const formatOptions = getFormatOptions(localeValue, options)
  const segments = formatToSegments(text, values, formatOptions)

  return segments
})

onMounted(() => {
  if (import.meta.env.DEV)
    collect(props.text, props.values as Values)
})
</script>

<template>
  <component :is="props.tag">
    <template v-for="(segment, i) in segments" :key="i">
      <template
        v-if="segment.type === 'text' || (segment.key && !slots[segment.key])"
      >
        {{ segment.part }}
      </template>
      <template v-else>
        <slot
          :name="(segment.key!)"
          v-bind="(segment.values as V)"
          :decline="(segment.decline)"
        />
      </template>
    </template>
  </component>
</template>
