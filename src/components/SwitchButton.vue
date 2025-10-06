<script setup>
import { computed } from 'vue'

const props = defineProps({
   disabled: Boolean,
   status: Boolean,
   slotWidth: {
      type: Number,
      default: 21,
   },
})

defineEmits(['toggle'])

// =============================================================================

/**
 * @param {boolean} status
 */
function getSlotClasses(status) {
   return [
      'box-border py-0.5 relative z-1 w-21 transition-all',
      {
         'text-zinc-200': status,
         'text-zinc-500': !status,
      },
   ]
}

const slotStyle = computed(() => ({
   width: `calc(var(--spacing)*${props.slotWidth})`,
}))

const $button = computed(() => ({
   'cursor-not-allowed': props.disabled,
   'cursor-pointer': !props.disabled,
}))
</script>

<template>
   <div class="flex gap-3 items-center">
      <div><slot /></div>
      <button
         class="bg-zinc-700/50 text-sm font-semibold flex relative items-center rounded-full p-1 select-none z-0"
         :class="$button"
         @click="!disabled ? $emit('toggle') : null"
      >
         <div :style="slotStyle" :class="getSlotClasses(status)">
            <slot name="true" />
         </div>
         <div :style="slotStyle" :class="getSlotClasses(!status)">
            <slot name="false" />
         </div>
         <div
            :style="slotStyle"
            class="bg-teal-700 h-6 rounded-full absolute transition-all duration-300"
            :class="{ 'left-1': status, 'left-[50%]': !status }"
         ></div>
      </button>
   </div>
</template>
