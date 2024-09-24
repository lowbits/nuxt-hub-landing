<script setup lang="ts">
defineProps<{
  headline?: string
  description?: string
}>()
</script>
<template>
  <div
      class="relative h-full w-full rounded-xl bg-zinc-900">
    <div
        class=" h-full w-full  overflow-hidden p-6 py-8 sm:p-4 lg:p-6">
      <div v-if="$slots.icon" class="bg-zinc-700 size-12 flex items-center justify-center rounded-full relative">
        <div
            class="size-8 bg-zinc-600 flex items-center justify-center rounded-full mx-auto text-[#C33E59] absolute isolate">
          <slot name="icon"/>
        </div>
      </div>
      <div class="mt-3 gap-x-6">
        <h3 class="text-white font-semibold text-lg">{{ headline }}</h3>
        <p class="text-sm/6 text-gray-300">{{
            description
          }}</p>
      </div>
      <footer v-if="$slots.footer" class="mt-3">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>
