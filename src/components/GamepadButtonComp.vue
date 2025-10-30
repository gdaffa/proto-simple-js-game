<script setup>
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'

const props = defineProps({
   icon: {
      default: '',
   },
   clickedKey: {
      required: false,
      type: String,
   },
})

// =============================================================================

const isClicked = ref(false)

// =============================================================================

const $button = computed(() => ({
   'text-2xl': props.icon,
   'shadow-[0_2px_1px_2px] border-zinc-600': !isClicked.value,
   'shadow-none            border-zinc-700 translate-y-0.5 brightness-85': isClicked.value,
}))

// =============================================================================

window.addEventListener('keydown', (ev) => {
   if (ev.code == props.clickedKey) {
      isClicked.value = true
   }
})
window.addEventListener('keyup', (ev) => {
   if (ev.code == props.clickedKey) {
      isClicked.value = false
   }
})
</script>

<template>
   <button
      class="bg-zinc-700 grid place-items-center rounded-lg transition-all border-t-1 shadow-zinc-900/50"
      :class="$button"
      @mousedown="isClicked = true"
      @mouseup="isClicked = false"
      @touchstart="isClicked = true"
      @touchend="isClicked = false"
   >
      <template v-if="icon">
         <Icon :icon="icon" />
      </template>
      <template v-else>
         <slot />
      </template>
   </button>
</template>
