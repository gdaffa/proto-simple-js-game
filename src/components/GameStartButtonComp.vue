<script setup>
import { computed } from 'vue'

const props = defineProps({
   disabled: {
      type: Boolean,
      default: false,
   },
})

// =============================================================================

const $button = computed(() => ({
   'cursor-pointer hover:scale-105': !props.disabled,
   'cursor-not-allowed': props.disabled,
}))
</script>

<template>
   <button
      class="text-lg font-semibold bg-teal-700 px-10 py-1 rounded-full select-none transition-all"
      :class="$button"
      :disabled="disabled"
   >
      Mulai!
   </button>
</template>
