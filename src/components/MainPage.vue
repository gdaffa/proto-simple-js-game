<template>
   <h1
      v-if="$slots.title"
      class="font-mozilla-headline text-4xl font-bold text-zinc-100 mb-6 text-center"
   >
      <slot name="title" />
   </h1>
   <slot />
</template>
