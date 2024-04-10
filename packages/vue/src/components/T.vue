<script setup lang="ts"
  generic="T extends Register, K extends keyof T['messages'], V extends InferContext<K | E>, E extends T['messages'][K][keyof T['messages'][K]]">
  import type { ResolveContext, InferContext, Register, Context } from '@psitta/core'
  import { collect, localizeMessage, resolveToSegments } from '@psitta/core'
  import { computed, onMounted, useSlots } from 'vue'
  import useLocale from '../composables/useLocale'

  const props = withDefaults(
    defineProps<{
      text: K
      context?: V
      tag?: string
    }>(),
    { tag: 'span' },
  )

  type SlotProps = typeof props.context & { inflect: ResolveContext<any>['inflect'] }
  type Slots = { [key in keyof V]: (slotProps: SlotProps) => any }
  defineSlots<Slots>()

  const slots = useSlots()

  const context = props.context || {}
  const locale = useLocale()

  const segments = computed(() => {
    const localeValue = locale.value
    const localizedMessage = localizeMessage(props.text as string, localeValue)
    const segments = resolveToSegments(localizedMessage, context, {
      locale: localeValue,
    })

    return segments
  })

  onMounted(() => {
    if (import.meta.env.DEV)
      collect(props.text as any, props.context as Context)
  })
</script>

<template>
  <component :is="props.tag">
    <template v-for="(segment, i) in segments" :key="i">
      <template v-if="segment.type === 'text' || (segment.key && !slots[segment.key])">
        {{ segment.part }}
      </template>
      <template v-else>
        <slot :name="(segment.key!)" v-bind="(segment.context as V)" :inflect="(segment.inflect)" />
      </template>
    </template>
  </component>
</template>
