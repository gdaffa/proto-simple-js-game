<script setup>
import { ref, reactive, computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import MarkdownIt from 'markdown-it'

import GameSection from '@/components/GameSection.vue'

// =============================================================================

const routeName = useRoute().name.replace(/ /g, '')
const mdit = new MarkdownIt()

const isOpen = reactive({
   game: true,
   explanation: true,
   gameplay: true,
})

const keyList = ref([])
const gameplayHtml = ref('')
const explanationHtml = ref('')

// =============================================================================

/**
 * Change left side section state in `isOpen` variable.
 *
 * @param section - Section name, either `key` or `explanation`.
 */
function toggleLeftSection(section) {
   isOpen[section] = !isOpen[section]

   if (!isOpen.gameplay && !isOpen.explanation) {
      isOpen.game = true
   }
}

/**
 * Change right side section state in `isOpen` variable.
 * The section will always be the `game` section.
 */
function toggleRightSection() {
   isOpen.game = !isOpen.game

   if (!isOpen.gameplay && !isOpen.explanation && !isOpen.game) {
      isOpen.gameplay = true
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

async function getAsset(asset) {
   return fetch(`/game-assets/${routeName.toLowerCase()}/${asset}.md`).then((res) => res.text())
}

// =============================================================================

const GameComp = defineAsyncComponent(() => import(`../games/${routeName}Game.vue`))

getAsset('explanation').then((raw) => (explanationHtml.value = mdit.render(raw)))

getAsset('gameplay').then((raw) => {
   raw = raw.replace(/\r/g, '')

   // gameplay category
   // the pattern is select all gameplay content until new line
   let gameplayRaw = raw.match(/# Gameplay\n\n(.*?)\n/)[1]
   gameplayHtml.value = mdit.renderInline(gameplayRaw)

   // key category
   // the pattern is select all key content with pattern like '[k] Desc'
   let keyRaw = raw.match(/# Key\n\n((?:\[\w+\].*\n{0,1})*)/)[1]
   let keyListTemp = []

   for (let line of keyRaw.split('\n')) {
      if (line == '') {
         continue
      }

      // '[k] Description' => ['[k] Desc', 'k', 'Description']
      let keyItems = line.match(/\[(\w*)\] (.*)/)
      keyItems.shift()

      let key = keyItems[0].toLowerCase()
      // alphabetical key
      if (key.length == 1) {
         keyItems[0] = `mynaui:letter-${key}-square-solid`
      }
      // arrow key
      if (key.length == 2 && key[0] == 'a') {
         let direction = { u: 'up', l: 'left', r: 'right', d: 'down' }
         keyItems[0] = `mynaui:arrow-${direction[key[1]]}-square-solid`
      }

      keyListTemp.push(keyItems)
   }

   keyList.value = keyListTemp
})

// =============================================================================

const $leftSection = {
   open: 'h-lvh lg:h-[calc(100%---spacing(14))]',
   closed: 'h-11',
}

const $leftSide = computed(() => ({
   'w-full lg:w-full': !isOpen.game,
   'w-full lg:w-[50%]': isOpen.game && (isOpen.gameplay || isOpen.explanation),
   'w-full lg:w-11': !isOpen.gameplay && !isOpen.explanation,
}))
const $rightSide = computed(() => ({
   'w-full h-11  lg:w-11    lg:h-11': !isOpen.game,
   'w-full h-lvh lg:w-[50%] lg:h-full': isOpen.game && (isOpen.gameplay || isOpen.explanation),
   'w-full h-lvh lg:w-full  lg:h-full': !isOpen.gameplay && !isOpen.explanation,
}))
</script>

<template>
   <div class="p-3 grid grid-rows-[min-content_min-content] lg:h-lvh lg:flex mt-15 md:mt-0 gap-3">
      <div class="flex flex-col gap-3 row-2 transition-all duration-600" :class="$leftSide">
         <GameSection
            :class="getLeftSectionClass('explanation')"
            titleTag="h2"
            :isOpen="isOpen.explanation"
            @toggle="toggleLeftSection('explanation')"
         >
            <template #title>Explanation</template>
            <div
               class="px-3 lg:px-11 py-3 [&>*:nth-child(n+2)]:mt-4"
               v-html="explanationHtml"
            ></div>
         </GameSection>
         <GameSection
            :class="getLeftSectionClass('gameplay')"
            titleTag="h2"
            :isOpen="isOpen.gameplay"
            @toggle="toggleLeftSection('gameplay')"
         >
            <template #title>Gameplay</template>
            <div class="px-3 lg:px-11 py-3">
               <ul class="flex flex-col gap-1 mb-4">
                  <li
                     v-for="(item, i) in keyList"
                     :key="i"
                     class="flex gap-3 items-center text-base"
                  >
                     <Icon
                        :icon="item[0]"
                        class="text-zinc-300/90 text-xl shadow-md shadow-zinc-900"
                     />
                     {{ item[1] }}
                  </li>
               </ul>
               <p v-html="gameplayHtml"></p>
            </div>
         </GameSection>
      </div>
      <div class="row-1 transition-all duration-600" :class="$rightSide">
         <GameSection
            class="h-full"
            titleTag="h1"
            :isOpen="isOpen.game"
            @toggle="toggleRightSection"
         >
            <template #title>Game</template>
            <GameComp />
         </GameSection>
      </div>
   </div>
</template>
