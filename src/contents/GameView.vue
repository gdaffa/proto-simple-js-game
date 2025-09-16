<script setup>
import { ref, computed } from 'vue';
import GameSection from '@/components/GameSection.vue';

const keyOpen = ref(false)
const $key = computed(() => ({
   // --spacing(11) + gap-3
   'h-[calc(100%---spacing(14))]': keyOpen.value,
   'h-11': !keyOpen.value
}))
const explanationOpen = ref(true)
const $explanation = computed(() => ({
   // --spacing(11) + gap-3
   'h-[calc(100%---spacing(14))]': explanationOpen.value,
   'h-11': !explanationOpen.value
}))
</script>

<template>
   <div class="p-3 h-[100dvh] flex gap-3">
      <div class="flex flex-col float-left w-[50%] h-full max-h-full gap-3">
         <GameSection class="" :class="$key" @toggle="keyOpen=!keyOpen">
            <template #title>Key</template>
            <p class="px-11 py-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non magni consectetur ad et eos vitae possimus cumque deleniti sapiente eligendi.</p>
         </GameSection>
         <GameSection class="" :class="$explanation" @toggle="explanationOpen=!explanationOpen">
            <template #title>Explanation</template>
            <p class="px-11 py-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non magni consectetur ad et eos vitae possimus cumque deleniti sapiente eligendi.</p>
         </GameSection>
      </div>
      <GameSection class="w-[50%] float-right">
         <template #title>Game</template>
      </GameSection>
   </div>
</template>