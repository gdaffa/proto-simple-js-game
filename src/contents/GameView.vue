<script setup>
import { ref, reactive, computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import GameSection from '@/components/GameSection.vue'

// =============================================================================

const routeName = useRoute().name.replace(/ /g, '')
const mdit = new MarkdownIt()

const isOpen = reactive({
   game: true,
   key: true,
   explanation: true,
})
const explanation = ref('')

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

// =============================================================================

const GameComp = defineAsyncComponent(() => import(`../games/${routeName}Game.vue`))

fetch(`/explanation/${routeName}Explanation.md`)
   .then((res) => res.text())
   .then((raw) => (explanation.value = mdit.render(raw)))

// =============================================================================

const $leftSection = {
   open: 'h-lvh lg:h-[calc(100%---spacing(14))]',
   closed: 'h-11',
}

const $leftSide = computed(() => ({
   'w-full lg:w-full': !isOpen.game,
   'w-full lg:w-[50%]': isOpen.game && (isOpen.key || isOpen.explanation),
   'w-full lg:w-11': !isOpen.key && !isOpen.explanation,
}))
const $rightSide = computed(() => ({
   'w-full h-11  lg:w-11    lg:h-11': !isOpen.game,
   'w-full h-lvh lg:w-[50%] lg:h-full': isOpen.game && (isOpen.key || isOpen.explanation),
   'w-full h-lvh lg:w-full  lg:h-full': !isOpen.key && !isOpen.explanation,
}))
</script>

<template>
   <div class="p-3 grid grid-rows-[min-content_min-content] lg:h-lvh lg:flex mt-15 md:mt-0 gap-3">
      <div class="flex flex-col gap-3 row-2 transition-all duration-600" :class="$leftSide">
         <GameSection
            :class="getLeftSectionClass('explanation')"
            :isOpen="isOpen.explanation"
            @toggle="toggleLeftSection('explanation')"
         >
            <template #title>Explanation</template>
            <div class="px-11 py-3 [&>*:nth-child(n+2)]:mt-4" v-html="explanation"></div>
         </GameSection>
         <GameSection
            class="hidden lg:block"
            :class="getLeftSectionClass('key')"
            :isOpen="isOpen.key"
            @toggle="toggleLeftSection('key')"
         >
            <template #title>Key</template>
            <p class="px-11 py-3">
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non magni consectetur ad et
               eos vitae possimus cumque deleniti sapiente eligendi.
            </p>
         </GameSection>
      </div>
      <div class="row-1 transition-all duration-600" :class="$rightSide">
         <GameSection class="h-full" :isOpen="isOpen.game" @toggle="toggleRightSection">
            <template #title>Game</template>
            <GameComp />
         </GameSection>
      </div>
   </div>
</template>
