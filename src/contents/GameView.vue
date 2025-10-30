<script setup>
import { ref, reactive, computed, defineAsyncComponent, useTemplateRef, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import MarkdownIt from 'markdown-it'

import GameSectionComp from '@/components/GameSectionComp.vue'

// =============================================================================

/**
 * A class to manage each section state easily.
 */
class GameSection {
   /**
    * @param {string} elem
    */
   constructor(elem) {
      this.elem = useTemplateRef(elem)
      return reactive(this)
   }

   style = ''
   class = ''
   content = ''
   isOpen = true
}

// =============================================================================

const routeName = useRoute().name
const routeNameNoSpace = routeName.replace(/ /g, '')
const mdit = new MarkdownIt()

const $Game = new GameSection('$GameElem')
const $Explanation = new GameSection('$ExplanationElem')
const $Gameplay = new GameSection('$GameplayElem')

const keyList = ref([])

// =============================================================================

/**
 * Parse key line from markdown into `[icon, description]`.
 *
 * @param {string} line
 */
function parseKeyLine(line) {
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

   return keyItems
}

/**
 * Change left side section open state, which is `$Gameplay` and `$Explanation`.
 *
 * @param {GameSection} $Section
 */
function toggleLeftSection($Section) {
   $Section.isOpen = !$Section.isOpen

   if (!$Gameplay.isOpen && !$Explanation.isOpen) {
      $Game.isOpen = true
   }
}

/**
 * Change right side open state, which is `$Game`.
 */
function toggleRightSection() {
   $Game.isOpen = !$Game.isOpen

   if (!$Gameplay.isOpen && !$Explanation.isOpen && !$Game.isOpen) {
      $Gameplay.isOpen = true
      $Explanation.isOpen = true
   }
}

/**
 * Update the template first, then update mobile height `$Section` style.
 *
 * @param {GameSection} $Section
 */
async function updateStyle($Section) {
   await nextTick()
   $Section.style = { '--mobile-height-open': `${$Section.elem.$el.scrollHeight}px` }
}

/**
 * Get markdown content file.
 *
 * @param {string} asset
 */
async function getAsset(asset) {
   return fetch(`/game-assets/${routeNameNoSpace}/${asset}.md`).then((res) => res.text())
}

// =============================================================================

const GameComp = defineAsyncComponent(() => import(`../games/${routeNameNoSpace}Game.vue`))

getAsset('explanation').then((raw) => {
   $Explanation.content = mdit.render(raw)
   updateStyle($Explanation)
})

getAsset('gameplay').then((raw) => {
   raw = raw.replace(/\r/g, '')

   // gameplay category
   // the pattern is select all gameplay content until new line
   let gameplayRaw = raw.match(/# Gameplay\n\n(.*?)\n/)
   $Gameplay.content = mdit.renderInline(gameplayRaw[1])

   // key category
   // the pattern is select all key content with pattern like '[k] Desc'
   let keyRaw = raw.match(/# Key\n\n((?:\[\w+\].*\n{0,1})*)/)
   if (keyRaw == null) {
      return
   }

   let keyLines = []
   for (let line of keyRaw[1].split('\n')) {
      if (line != '') {
         keyLines.push(parseKeyLine(line))
      }
   }

   keyList.value = keyLines
   updateStyle($Gameplay)
})

// =============================================================================

$Explanation.class = computed(() => ({
   'left_side--section-open': $Explanation.isOpen,
   'left_side--section-closed': !$Explanation.isOpen,
}))
$Gameplay.class = computed(() => ({
   'left_side--section-open': $Gameplay.isOpen,
   'left_side--section-closed': !$Gameplay.isOpen,
}))

const $leftSide = computed(() => ({
   'left_side-open lg:w-full': !$Game.isOpen,
   'left_side-open': $Game.isOpen && ($Gameplay.isOpen || $Explanation.isOpen),
   'left_side-closed': !$Gameplay.isOpen && !$Explanation.isOpen,
}))
const $rightSide = computed(() => ({
   'right_side-closed': !$Game.isOpen,
   'right_side-open': $Game.isOpen && ($Gameplay.isOpen || $Explanation.isOpen),
   'right_side-open lg:w-full': !$Gameplay.isOpen && !$Explanation.isOpen,
}))
</script>

<template>
   <div class="p-3 grid grid-rows-[min-content_min-content] lg:h-lvh lg:flex mt-15 md:mt-0 gap-3">
      <div class="flex flex-col gap-3 row-2 transition-all duration-600" :class="$leftSide">
         <GameSectionComp
            ref="$ExplanationElem"
            :style="$Explanation.style"
            :class="$Explanation.class"
            titleTag="h2"
            :isOpen="$Explanation.isOpen"
            @toggle="toggleLeftSection($Explanation)"
         >
            <template #title>Explanation</template>
            <div
               class="px-3 lg:px-11 py-3 [&>*:nth-child(n+2)]:mt-4 w-full overflow-y-scroll overflow-x-hidden"
               v-html="$Explanation.content"
            ></div>
         </GameSectionComp>
         <GameSectionComp
            ref="$GameplayElem"
            :style="$Gameplay.style"
            :class="$Gameplay.class"
            titleTag="h2"
            :isOpen="$Gameplay.isOpen"
            @toggle="toggleLeftSection($Gameplay)"
         >
            <template #title>Gameplay</template>
            <div class="px-3 lg:px-11 py-3 overflow-y-scroll overflow-x-hidden">
               <ul v-if="keyList.length > 0" class="flex flex-col gap-1 mb-4">
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
               <p v-html="$Gameplay.content"></p>
            </div>
         </GameSectionComp>
      </div>
      <div :style="$Game.style" class="row-1 transition-all duration-600" :class="$rightSide">
         <GameSectionComp
            ref="$GameElem"
            class="h-full"
            titleTag="h1"
            :isOpen="$Game.isOpen"
            @toggle="toggleRightSection"
         >
            <template #title>{{ routeName }}</template>
            <GameComp @vue:mounted="updateStyle($Game)" />
         </GameSectionComp>
      </div>
   </div>
</template>

<style scoped>
@import '../assets/style.css';

::-webkit-scrollbar {
   @apply w-2.5;
}
::-webkit-scrollbar-track {
   @apply bg-transparent;
}
::-webkit-scrollbar-thumb {
   @apply bg-zinc-700 rounded-full;
}

@layer components {
   .right_side-open {
      @apply w-full h-(--mobile-height-open) lg:w-[50%] lg:h-full;
   }
   .right_side-closed {
      @apply w-full h-section-icon-size lg:w-section-icon-size lg:h-section-icon-size;
   }

   .left_side-open {
      @apply w-full lg:w-[50%];
   }
   .left_side-closed {
      @apply w-full lg:w-section-icon-size;
   }

   .left_side--section-open {
      @apply h-(--mobile-height-open) max-h-[90lvh]
         lg:h-[calc(100%-var(--spacing-section-icon-size)---spacing(3))]
         lg:max-h-none;
   }
   .left_side--section-closed {
      @apply h-section-icon-size lg:h-section-icon-size;
   }
}
</style>
