<template>
   <div class="mx-auto w-268 max-w-full p-6">
      <h1
         v-if="$slots.title"
         class="font-mozilla-headline text-zinc-100 text-4xl text-center font-bold mb-6 mt-15 md:mt-0"
      >
         <slot name="title" />
      </h1>
      <slot />
   </div>
</template>
