<script setup>
import { reactive } from 'vue';
import GameSection from '@/components/GameSection.vue';

// =============================================================================

const isOpen = reactive({
   game: true,
   key: true,
   explanation: true
})

const $leftSide = {
   open: 'h-[calc(100%---spacing(14))]',
   closed: 'h-11'
}
const $rightSide = {
   open: '',
   closed: ''
}

// =============================================================================

/**
 * Change section state on `isOpen` reactive variable.
 * 
 * @param section - Section name.
 */
function toggleState(section) {
   isOpen[section] = !isOpen[section]
}

/**
 * Render a specific class to a section according to its side.
 * 
 * @param side - Right or left side on the website view.
 * @param section - Section name.
 */
function renderClasses(side, section) {
   let status = isOpen[section] ? 'open' : 'closed'
   let selectedSide = {left: $leftSide, right: $rightSide}[side]
   return selectedSide[status]
}
</script>

<template>
   <div class="p-3 h-[100dvh] flex gap-3">
      <div class="flex flex-col float-left w-[50%] h-full max-h-full gap-3">

         <GameSection
            :class="renderClasses('left', 'key')"
            :isOpen="isOpen.key"
            @toggle="toggleState('key')"
         >
            <template #title>Key</template>
            <p class="px-11 py-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non magni consectetur ad et eos vitae possimus cumque deleniti sapiente eligendi.</p>
         </GameSection>

         <GameSection
            :class="renderClasses('left', 'explanation')"
            :isOpen="isOpen.explanation"
            @toggle="toggleState('explanation')"
         >
            <template #title>Explanation</template>
            <p class="px-11 py-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non magni consectetur ad et eos vitae possimus cumque deleniti sapiente eligendi.</p>
         </GameSection>

      </div>

      <GameSection
         class="w-[50%] float-right"
         :class="renderClasses('right', 'game')"
         :isOpen="isOpen.explanation"
      >
         <template #title>Game</template>
      </GameSection>

   </div>
</template>