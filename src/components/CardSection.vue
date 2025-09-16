<script setup>
import { RouterLink } from 'vue-router'
import gameRoutes from '@/router/game-routes.js'

const difficulty = ['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard']
const $difficulty = [
   ['bg-green-900 text-green-200'],
   ['bg-lime-900 text-lime-200'],
   ['bg-yellow-900 text-yellow-200'],
   ['bg-orange-900 text-orange-200'],
   ['bg-red-900 text-red-200'],
]
</script>
<template>
   <ul class="grid grid-cols-[repeat(auto-fill,minmax(224px,1fr))] gap-4 mt-8">
      <li v-for="(game, index) in gameRoutes" :key="index" class="rounded-xl overflow-hidden">
         <img src="/src/assets/images/game.jpg" alt="" class="aspect-video object-cover" />
         <div class="flex flex-col px-3 py-2 bg-zinc-600/10 h-full">
            <h2 class="text-zinc-200 font-mozilla-headline font-semibold text-lg">
               <RouterLink :to="game.path">{{ game.name }}</RouterLink>
            </h2>
            <div class="mt-1 mb-2">
               <span
                  class="text-xs rounded-full inline-block px-2 py-0.5"
                  :class="$difficulty[game.difficulty]"
               >
                  {{ difficulty[game.difficulty] }}
               </span>
            </div>
            <div class="text-zinc-400 text-sm line-clamp-2">
               {{ game.description }}
            </div>
         </div>
      </li>
   </ul>
</template>
