<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue'

// =============================================================================

const isSidebarOpen = ref(false)

function openSidebar(state) {
   isSidebarOpen.value = state
}

// =============================================================================

const mainPageClass = {
   sidebarClose: [
      // mobile
      'w-dvw',
      // desktop
      'md:w-dvw',
   ],
   sidebarOpen: [
      // mobile
      'w-dvw',
      // desktop
      'md:w-[calc(100dvw-var(--spacing)*55)]',
   ],
}
</script>

<template>
   <SideBar @openSidebar="openSidebar" :isSidebarOpen="isSidebarOpen"></SideBar>
   <RouterView
      class="float-right transition-all duration-400"
      :class="[mainPageClass[isSidebarOpen ? 'sidebarOpen' : 'sidebarClose']]"
   ></RouterView>
</template>
