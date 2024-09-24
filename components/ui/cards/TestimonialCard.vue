<script setup lang="ts">
import Card from "~/components/ui/cards/Card.vue";

defineProps<{
  name?: string
  description?: string
  author: {
    fullName: string
    role: string
    avatar: string
  }
}>()
</script>

<template>
  <Card :headline="name" :description="description">
    <template #footer>
      <div class="flex gap-4">
        <div class="w-12 h-12 bg-zinc-700 rounded-full"></div>
        <div class="text-gray-300 text-base leading-5">
          <p class="font-semibold">{{ author.fullName }}</p>
          <p>{{ author.role }}</p>
        </div>
      </div>
    </template>
  </Card>
</template>
