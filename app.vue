<script setup lang="ts">

useHead({
  bodyAttrs: {
    class: 'bg-black',
  }
})

useSeoMeta({
  title: 'Validate your idea - setup your landing page in minutes | NuxtHubLanding',
  applicationName: 'NuxtHubLanding',
  description: 'Validate your idea quickly with the NuxtHub Boilerplate – a landing page template that lets you capture interest and sign up users in minutes. Launch your product in no time and start gathering feedback from real customers.',
  ogType: 'website',
  ogTitle: 'Validate your idea - setup your landing page in minutes | NuxtHubLanding',
  ogDescription: 'Validate your idea quickly with the NuxtHub Boilerplate – a landing page template that lets you capture interest and sign up users in minutes. Launch your product in no time and start gathering feedback from real customers.',
  twitterCard: 'summary_large_image',
  twitterCreator: '@lowbits_',
})

const currentYear = computed(() => new Date().getFullYear())
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <NuxtPage class="flex-1"/>


    <footer class="bg-zinc-900">
      <div class="px-6 xl:px-0 max-w-6xl mx-auto text-zinc-500 py-3">
        <a href="" class="text-[#D65320]">© {{ currentYear }} NuxtHubLanding</a>
      </div>
    </footer>
  </div>
</template>
