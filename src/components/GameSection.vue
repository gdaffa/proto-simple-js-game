<script setup>
import { Icon } from '@iconify/vue';

defineProps(['isOpen'])
defineEmits(['toggle'])
</script>

<template>
   <section class="rounded-lg bg-zinc-800 overflow-hidden transition-all duration-400">

      <h1 class="text-xl font-mozilla-headline font-bold flex items-center px-3 py-2 gap-2 overflow-visible justify-start">
         <Icon
            icon="solar:alt-arrow-down-bold"
            class="text-2xl transition-all duration-400"
            :class="{'-rotate-90': !isOpen}"
            @click="$emit('toggle')"
         />
         <slot name="title"/>
      </h1>

      <slot/>

   </section>
</template>