<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

import mainRoutes from '@/router/main-routes.js'
import gameRoutes from '@/router/game-routes.js'

const props = defineProps(['isSidebarOpen'])
const emits = defineEmits(['toggleSidebar'])

// =============================================================================

const route = useRoute()
const pages = mainRoutes
const isOpenWhenHover = ref(true)

// =============================================================================

/**
 * Event triggered by clicking the hamburger menu.
 */
function toggleSidebar() {
   emits('toggleSidebar')
   isOpenWhenHover.value = false
}

/**
 * Compute which page is selected based on the path.
 */
const computedPages = computed(() => {
   let isNowGamePage = gameRoutes.some((game) => game.name == route.name)
   let activePath = isNowGamePage ? '/' : route.path

   let newPages = pages.map((page) => {
      let selected = page.path == activePath
      return {
         ...page,
         classes: { 'text-zinc-50 bg-sky-700': selected },
         icon: `solar:${page.icon}-${selected ? 'bold' : 'broken'}`,
      }
   })

   return newPages
})

// =============================================================================

const $sidebar = computed(() => ({
   'w-full ml-0       md:w-sidebar-open  md:ml-0': props.isSidebarOpen,
   'w-full ml-[-100%] md:w-sidebar-close md:ml-0': !props.isSidebarOpen,
   'md:hover:w-sidebar-open': isOpenWhenHover.value,
}))

const $hamburger = computed(() => ({
   'text-zinc-300 left-0    ml-0 md:left-0 md:ml-0': props.isSidebarOpen,
   'text-zinc-500 left-full ml-6 md:left-0 md:ml-0': !props.isSidebarOpen,
}))
</script>

<template>
   <nav
      class="bg-zinc-950 h-lvh fixed p-3 group transition-all duration-400 z-1"
      :class="$sidebar"
      @mouseleave="isOpenWhenHover = true"
   >
      <div
         class="sidebar__item aspect-square w-min gap-0 relative duration-400 hover:text-zinc-100"
         :class="$hamburger"
         @click="toggleSidebar"
      >
         <Icon
            :icon="`solar:hamburger-menu${isSidebarOpen ? '-linear' : '-broken'}`"
            class="text-2xl"
         />
      </div>
      <hr class="mb-3 border-zinc-900 border-1" />
      <ul>
         <li v-for="(page, i) of computedPages" :key="i">
            <RouterLink :to="page.path" class="sidebar__item" :class="page.classes">
               <Icon :icon="page.icon" class="text-2xl" />
               <span>{{ page.name }}</span>
            </RouterLink>
         </li>
      </ul>
   </nav>
</template>
