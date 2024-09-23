<script setup lang="ts">
import {$fetch} from "ofetch";

const email = ref('')
const success = ref(false)
const errors = ref<{ code: string, message: string, path: string [], validation: string }[]>([])

useHead({title: 'Nuxt Hub Landing - Join the waitlist'})

const joinWaitlist = async () => {
  errors.value = []

  try {
    const response = await $fetch('api/join-waitlist', {
      method: 'POST', body: {
        email: email.value,
      }
    })

    email.value = ''
    success.value = true

    setTimeout(() => {
      success.value = false
    }, 5000)
  } catch (e) {
    console.log(e.data)
    switch (e.response.status) {
      case 400: {
        errors.value = e.data.data.issues
        break;
      }
    }
  }
}

useHead({
  bodyAttrs: {
    class: 'bg-zinc-50 dark:bg-black'
  }
})
</script>
<template>
  <div>
    <div class="mt-20 max-w-6xl mx-auto">

      <div class="flex justify-between">


        <div class="max-w-lg">
        <span class="px-1.5 py-1 text-xs bg-[#D65320] bg-opacity-80 text-gray-300">
          💡 Validate Your Idea's
        </span>
          <h1 class="mt-1.5 text-white text-5xl tracking-tight">
            Setup your <span
              class="inline bg-gradient-to-r from-[#D65320] to-[#C33E59] bg-clip-text font-display text-transparent">Landing Page</span>
            in minutes</h1>

          <p class="mt-4 text-sm/6 text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur esse inventore, non provident
            quos
            sed tempore temporibus unde vitae. Aliquam atque doloribus libero perferendis saepe tempora voluptatem
            voluptates voluptatum.
          </p>


          <div class="mt-20">
            <form class="relative max-w-md overflow-hidden" @submit.prevent="joinWaitlist">
              <div>
                <div class="flex items-center gap-2 justify-between px-4 py-1.5 border border-[#D65320] rounded-lg">
                  <label for="email" class="sr-only">E-Mail</label>
                  <input
                      class="px-4 py-2 flex-1 bg-transparent text-white transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900 ease-linear duration-300  rounded"
                      v-model="email" id="email" required
                      type="text" placeholder="E-Mail Address"/>
                  <button
                      class="bg-[#C33E59] border border-[#C33E59] text-white hover:bg-opacity-80 ease-in-out transition-colors rounded-lg px-3 py-1"
                      type="submit">Join
                    Waitlist
                  </button>
                </div>
                <p class="text-base/6 text-red-600 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-red-500"
                   v-for="error in errors">{{ error.path.join(',') }}: {{ error.message }}</p>
              </div>

              <Transition
                  enter-from-class="opacity-0"
                  enter-active-class="transition ease-in-out duration-150"
                  enter-to-class="opacity-100"
                  leave-from-class="opacity-100"
                  leave-active-class="transition ease-out duration-150"
                  leave-to-class="opacity-0"
              >
                <div v-if="success"
                     class="absolute border inset-0 border-[#D65320] bg-[#D65320] flex items-center justify-center">
                  <p class="text-center text-white">
                    🫡 We'll keep you posted!
                  </p>
                </div>
              </Transition>

            </form>
          </div>
        </div>

        <div class="mt-32 relative">
        <span class="absolute -top-10 -left-2 px-1.5 py-1 text-xs bg-[#D65320] bg-opacity-80 text-gray-300">
          🪛 Build with
        </span>
          <div class="w-[100px] space-y-5">
            <a href="https://nuxt.com/" target="_blank" rel="noreferrer" title="Build with nuxtjs"><img
                src="~/assets/logos/nuxt-logo-white.svg" alt="Nuxtjs Logo"></a>
            <img src="~/assets/logos/tailwindcss-logo-white.svg" alt="Tailwindcss Logo">
            <img src="~/assets/logos/resend-logo-white.svg" alt="Resend Logo">
            <img src="~/assets/logos/vuemail-logo-dark.png" alt="Vuemail Logo">
            <img src="~/assets/logos/nuxt-hub-logo-white.svg" alt="Nuxthub Logo">
          </div>
        </div>
      </div>


      <div class="mt-20" id="features">
        <NuxtLink class="flex items-center gap-2 justify-between text-[#D65320] font-semibold text-sm" to="#features">
          Features
        </NuxtLink>
        <h2 class="text-white text-xl mt-2">Focus on the part that matters...</h2>
        <p class="text-zinc-400">A curated list</p>

        <div class="mt-8 flex gap-5">


          <div
              class="relative h-full w-full rounded-xl bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">

            <div
                class="grid h-full w-full justify-items-center overflow-hidden place-items-center p-6 py-8 sm:p-8 lg:p-12">
              <div class="flex gap-x-6">
                here
              </div>
            </div>
          </div>

          <div
              class="relative h-full w-full rounded-xl bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">

            <div
                class="grid h-full w-full justify-items-center overflow-hidden place-items-center p-6 py-8 sm:p-8 lg:p-12">
              <div class="flex gap-x-6">
                here
              </div>
            </div>
          </div>

          <div
              class="relative h-full w-full rounded-xl bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">

            <div
                class="grid h-full w-full justify-items-center overflow-hidden place-items-center p-6 py-8 sm:p-8 lg:p-12">
              <div class="flex gap-x-6">
                here
              </div>
            </div>
          </div>

        </div>

      </div>


      <div class="mt-20" id="pricing">
        <NuxtLink class="flex items-center gap-2 justify-between text-[#D65320] font-semibold text-sm" to="#features">
          Pricing
        </NuxtLink>
        <h2 class="text-white text-xl mt-2">Focus on the part that matters...</h2>
        <p class="text-zinc-400">It's free</p>
        <p class="text-zinc-400">It's free</p>
      </div>

      <div class="text-center mt-20" id="testimonials">
        <NuxtLink class="text-[#D65320] font-semibold text-sm" to="#testimonials">
          Build with nuxt-hub-landing
        </NuxtLink>
        <h2 class="text-white text-xl mt-2">Focus on the part that matters...</h2>
        <p class="text-zinc-400">It's free</p>
        <p class="text-zinc-400">It's free</p>
      </div>

    </div>
  </div>
</template>
