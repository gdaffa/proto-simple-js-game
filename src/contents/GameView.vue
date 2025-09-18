<script setup>
import { reactive, computed } from 'vue';
import GameSection from '@/components/GameSection.vue';

// =============================================================================

const isOpen = reactive({
   game: true,
   key: true,
   explanation: true
})

const $leftSection = {
   open: 'h-[calc(100%---spacing(14))]',
   closed: 'h-11'
}

const $leftSide = computed(() => ({
   'w-full': !isOpen.game,
   'w-[50%]': isOpen.game && (isOpen.key || isOpen.explanation),
   'w-11': !isOpen.key && !isOpen.explanation
}))
const $rightSide = computed(() => ({
   'w-full h-full': !isOpen.key && !isOpen.explanation,
   'w-[50%] h-full': isOpen.game && (isOpen.key || isOpen.explanation),
   'w-11 h-11': !isOpen.game
}))

// =============================================================================

/**
 * Change left side section state in `isOpen` variable.
 * 
 * @param section - Section name, either `key` or `explanation`.
 */
function toggleLeftSection(section) {
   isOpen[section] = !isOpen[section]

   if (!isOpen.key && !isOpen.explanation) {
      isOpen.game = true
   }
}

/**
 * Change right side section state in `isOpen` variable.
 * The section will always be the `game` section.
 */
function toggleRightSection() {
   isOpen.game = !isOpen.game

   if (!isOpen.key && !isOpen.explanation && !isOpen.game) {
      isOpen.key = true
      isOpen.explanation = true
   }
}

/**
 * Get a class that is already determined for left section side.
 * 
 * @param section - Section name, either `key` or `explanation`.
 */
function getLeftSectionClass(section) {
   return $leftSection[isOpen[section] ? 'open' : 'closed']
}
</script>

<template>
   <div class="p-3 h-[100dvh] flex gap-3">
      <div
         class="flex flex-col float-left h-full gap-3 transition-all duration-600"
         :class="$leftSide"
      >

         <GameSection
            :class="getLeftSectionClass('key')"
            :isOpen="isOpen.key"
            @toggle="toggleLeftSection('key')"
         >
            <template #title>Key</template>
            <p class="px-11 py-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non magni consectetur ad et eos vitae possimus cumque deleniti sapiente eligendi.</p>
         </GameSection>

         <GameSection
            :class="getLeftSectionClass('explanation')"
            :isOpen="isOpen.explanation"
            @toggle="toggleLeftSection('explanation')"
         >
            <template #title>Explanation</template>
            <p class="px-11 py-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non magni consectetur ad et eos vitae possimus cumque deleniti sapiente eligendi.</p>
         </GameSection>

      </div>
      <div class="transition-all duration-600" :class="$rightSide">

         <GameSection
            class="h-full"
            :isOpen="isOpen.game"
            @toggle="toggleRightSection"
         >
            <template #title>Game</template>
         </GameSection>

      </div>
   </div>
</template>