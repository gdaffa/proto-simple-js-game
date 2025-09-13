<script setup>
import { ref, computed } from 'vue'
import { RouterView } from 'vue-router'
import SideBar from '@/layouts/SideBar.vue'

// =============================================================================

const isSidebarOpen = ref(false)

function openSidebar(state) {
   isSidebarOpen.value = state
}

// =============================================================================

const $main = computed(() => ({
   'w-dvw md:w-[calc(100dvw-var(--spacing-sidebar-open))]': isSidebarOpen.value,
   'w-dvw md:w-[calc(100dvw-var(--spacing-sidebar-close))]': !isSidebarOpen.value,
}))
</script>

<template>
   <SideBar @openSidebar="openSidebar" :isSidebarOpen="isSidebarOpen" />
   <main
      class="float-right max-w-full mt-15 md:mt-0 p-6 box-border grid grid-cols-[min(--spacing(262),100%)] justify-center transition-all duration-400"
      :class="$main"
   >
      <RouterView />
   </main>
</template>