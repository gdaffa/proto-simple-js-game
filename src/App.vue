<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue'

const isSidebarOpen = ref(false)

function openSidebar(state) {
   isSidebarOpen.value = state
}
</script>

<template>
   <SideBar @openSidebar="openSidebar" :isSidebarOpen="isSidebarOpen"></SideBar>
   <RouterView
      class="w-[calc(100dvw-var(--spacing)*55)] float-right transition-all duration-400"
      :class="{ 'w-dvw': !isSidebarOpen }"
   ></RouterView>
</template>
