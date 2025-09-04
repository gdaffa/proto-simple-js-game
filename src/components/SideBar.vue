<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

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

const computedPages = computed(() =>
   pages.map((page) => {
      let selected = page.path == route.path
      return { ...page, selected, icon: `solar:${page.icon}-${selected ? 'bold' : 'broken'}` }
   }),
)
</script>

<template>
   <nav
      class="bg-zinc-950 h-dvh fixed p-3 w-18 hover:w-55 text-zinc-300 group transition-all duration-400"
   >
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
