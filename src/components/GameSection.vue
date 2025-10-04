<script setup>
import { Icon } from '@iconify/vue'

defineProps(['titleTag', 'isOpen'])
defineEmits(['toggle'])
</script>

<template>
   <section
      class="text-zinc-300 rounded-lg bg-zinc-800 overflow-hidden transition-all duration-600"
   >
      <div class="text-zinc-200 grid grid-cols-[min-content_1fr] items-center bg-inherit relative">
         <button class="w-11 aspect-square grid place-items-center" @click="$emit('toggle')">
            <Icon
               icon="solar:alt-arrow-down-bold"
               class="text-2xl transition-all duration-400"
               :class="{ '-rotate-90': !isOpen }"
            />
         </button>
         <component :is="$props.titleTag" class="text-xl font-mozilla-headline font-bold py-2">
            <slot name="title" />
         </component>
      </div>
      <slot />
   </section>
</template>
