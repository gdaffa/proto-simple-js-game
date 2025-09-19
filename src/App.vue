<script setup>
import { ref, computed } from 'vue'
import { RouterView } from 'vue-router'
import SideBar from '@/layouts/SideBar.vue'

// =============================================================================

const isSidebarOpen = ref(false)

function toggleSidebar() {
   isSidebarOpen.value = !isSidebarOpen.value
}

// =============================================================================

const $main = computed(() => ({
   'w-full md:w-[calc(100%-var(--spacing-sidebar-open))]': isSidebarOpen.value,
   'w-full md:w-[calc(100%-var(--spacing-sidebar-close))]': !isSidebarOpen.value,
}))
</script>

<template>
   <SideBar @toggleSidebar="toggleSidebar" :isSidebarOpen="isSidebarOpen" />
   <main class="float-right max-w-full transition-all duration-400" :class="$main">
      <RouterView />
   </main>
</template>
