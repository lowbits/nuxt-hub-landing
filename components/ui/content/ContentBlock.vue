<script setup lang="ts">
withDefaults(defineProps<{
  anchor: string;
  alignment?: 'left' | 'center';
}>(), {alignment: 'left'});
</script>

<template>
  <section :id="anchor" :class="{
    'flex flex-col items-center text-center': alignment === 'center',
  }">
    <NuxtLink class="text-[#D65320] font-semibold text-sm" :to="`#${anchor}`">
      <slot name="term"/>
    </NuxtLink>

    <h2 class="text-white text-xl mt-2">
      <slot name="headline"/>
    </h2>

    <p class="mt-2 max-w-xl text-zinc-400">
      <slot name="description"/>
    </p>

    <div v-if="$slots.default" class="mt-8 text-left grid grid-cols-1 lg:grid-cols-3 gap-5">
      <slot/>
    </div>
  </section>
</template>
