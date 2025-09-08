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
   'main_sidebar-open': isSidebarOpen.value,
   'main_sidebar-close': !isSidebarOpen.value,
}))
</script>

<template>
   <SideBar @openSidebar="openSidebar" :isSidebarOpen="isSidebarOpen" />
   <div class="float-right transition-all duration-400" :class="$main">
      <main class="w-262 mx-auto max-w-full box-border p-6 mt-15 md:mt-0">
         <RouterView />
      </main>
   </div>
</template>
