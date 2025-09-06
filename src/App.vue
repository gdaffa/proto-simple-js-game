<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import SideBar from '@/layouts/SideBar.vue'

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
      'md:w-[calc(100dvw-var(--spacing-sidebar-close))]',
   ],
   sidebarOpen: [
      // mobile
      'w-dvw',
      // desktop
      'md:w-[calc(100dvw-var(--spacing-sidebar-open))]',
   ],
}
</script>

<template>
   <SideBar @openSidebar="openSidebar" :isSidebarOpen="isSidebarOpen" />
   <div
      class="float-right transition-all duration-400"
      :class="[mainPageClass[isSidebarOpen ? 'sidebarOpen' : 'sidebarClose']]"
   >
      <main class="w-250 mx-auto max-w-full box-border pt-6">
         <RouterView />
      </main>
   </div>
</template>
