<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const props = defineProps(['isSidebarOpen'])
const emits = defineEmits(['openSidebar'])

const route = useRoute()

const pages = [
   {
      name: 'Game',
      path: '/',
      icon: 'gamepad-charge',
   },
   {
      name: 'Contribute',
      path: '/contribute',
      icon: 'hand-heart',
   },
   {
      name: 'About',
      path: '/about',
      icon: 'info-circle',
   },
]
const isOpenWhenHover = ref(true)

/**
 * Compute which page is selected based on the path.
 */
const computedPages = computed(() =>
   pages.map((page) => {
      let selected = page.path == route.path
      return {
         ...page,
         selected,
         icon: `solar:${page.icon}-${selected ? 'bold' : 'broken'}`,
      }
   }),
)

/**
 * Event triggered by clicking the hamburger menu.
 */
function toggleSidebar() {
   emits('openSidebar', !props.isSidebarOpen)
   isOpenWhenHover.value = false
}
</script>

<template>
   <nav
      class="bg-zinc-950 h-dvh fixed p-3 w-18 text-zinc-400 group transition-all duration-400"
      :class="{ 'w-55': isSidebarOpen, 'hover:w-55': isOpenWhenHover }"
      @mouseleave="isOpenWhenHover = true"
   >
      <div class="sidebar__item aspect-square w-min gap-0" @click="toggleSidebar">
         <Icon
            :icon="`solar:hamburger-menu${isSidebarOpen ? '-linear' : '-broken'}`"
            class="text-2xl"
         ></Icon>
      </div>
      <hr class="mb-3 border-zinc-900 border-1" />
      <ul>
         <li v-for="(page, i) of computedPages" :key="i">
            <RouterLink
               :to="page.path"
               class="sidebar__item"
               :class="{ sidebar__item_selected: page.selected }"
               ><Icon :icon="page.icon" class="text-2xl" />
               <div>{{ page.name }}</div></RouterLink
            >
         </li>
      </ul>
   </nav>
</template>
