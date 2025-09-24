<script setup>
const [x, y] = [12, 8]
</script>

<template>
   <table class="w-full" :style="{ 'aspect-ratio': `${x}/${y}` }">
      <tr v-for="i in y" :key="i">
         <td
            v-for="j in x"
            :key="j"
            :style="{ width: `${100 / x}%` }"
            class="border-4 border-zinc-700 aspect-square text-center"
         >
            {{ i }}, {{ j }}
         </td>
      </tr>
   </table>
</template>
