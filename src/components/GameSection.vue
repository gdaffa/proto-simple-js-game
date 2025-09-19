<script setup>
import { Icon } from '@iconify/vue'

defineProps(['isOpen'])
defineEmits(['toggle'])
</script>

<template>
   <section class="rounded-lg bg-zinc-800 overflow-hidden transition-all duration-600">
      <div class="grid grid-cols-[min-content_1fr] items-center">
         <button class="w-11 aspect-square grid place-items-center" @click="$emit('toggle')">
            <Icon
               icon="solar:alt-arrow-down-bold"
               class="text-2xl transition-all duration-400"
               :class="{ '-rotate-90': !isOpen }"
            />
         </button>
         <h1 class="text-xl font-mozilla-headline font-bold py-2">
            <slot name="title" />
         </h1>
      </div>

      <slot />
   </section>
</template>
