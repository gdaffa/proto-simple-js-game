<script setup>
import { Icon } from '@iconify/vue'

defineProps({
   status: {
      type: String,
      default: 'info',
   },
})

// =============================================================================

const iconList = {
   info: 'solar:info-circle-linear',
   danger: 'solar:danger-circle-linear',
}
const $text = {
   info: 'text-zinc-400',
   danger: 'text-red-400',
}
</script>

<template>
   <div class="text-sm flex gap-1 items-center" :class="$text[status]">
      <Icon :icon="iconList[status]" />
      <slot />
   </div>
</template>
