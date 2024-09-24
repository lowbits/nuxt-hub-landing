<script setup lang="ts">
import {$fetch} from "ofetch";
import Card from "~/components/ui/cards/Card.vue";
import TestimonialCard from "~/components/ui/cards/TestimonialCard.vue";

const email = ref('')
const success = ref(false)
const errors = ref<{ code: string, message: string, path: string [], validation: string }[]>([])

useHead({title: 'Nuxt Hub Landing - Join the waitlist'})

const joinWaitlist = async () => {
  errors.value = []

  try {
    await $fetch('api/join-waitlist', {
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

const currentYear = computed(() => new Date().getFullYear())
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
            Save time using the <strong>NuxtHub-Landing template</strong>, to verify your ideas. Deploy it for
            free on NuxtHub, collect leads for your next big thing.
          </p>

          <p class="text-white font-semibold text-sm mt-2">Clone it, customize it, commercialize it.</p>
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
          <p class="absolute -top-10 -left-2 px-1.5 py-1 text-xs  text-gray-300">
            🪛 Build with
          </p>
          <ul class="w-[100px] space-y-5">
            <li><a href="https://nuxt.com/" target="_blank" rel="noreferrer" title="Build with nuxtjs"><img
                src="~/assets/logos/nuxt-logo-white.svg" alt="Nuxtjs Logo"></a>
            </li>

            <li><a href="https://tailwindcss.com/" target="_blank" rel="noreferrer" title="Build with tailwindcss"><img
                src="~/assets/logos/tailwindcss-logo-white.svg" alt="Tailwindcss Logo"></a>
            </li>

            <li><a href="https://hub.nuxt.com/" target="_blank" rel="noreferrer" title="Build with nuxt hub"><img
                src="~/assets/logos/nuxt-hub-logo-white.svg" alt="Nuxthub Logo"></a>
            </li>

          </ul>
        </div>
      </div>


      <div class="mt-20" id="features">
        <NuxtLink class="flex items-center gap-2 justify-between text-[#D65320] font-semibold text-sm" to="#features">
          Features
        </NuxtLink>
        <h2 class="text-white text-xl mt-2">Focus on the part that matters...</h2>
        <p class="text-zinc-400">Verify your idea before jumping into implementation — it saves time and gray hairs.</p>

        <div class="mt-8 grid grid-cols-3 gap-5">
          <Card headline="Customizable" description="It's your code, you can adjust it specific to your needs.">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"/>
              </svg>
            </template>
          </Card>

          <Card headline="SEO" description="SEO always sucks, we added all necessary SEO tags so you dont have
          to. Replace them with yours.">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
              </svg>
            </template>
          </Card>


          <Card headline="Deploy" description="Deploy your landing page in minutes, collect emails to verify your
                  idea.">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
              </svg>
            </template>
          </Card>
        </div>
      </div>


      <div class="mt-20" id="pricing">
        <NuxtLink class="flex items-center gap-2 justify-between text-[#D65320] font-semibold text-sm" to="#features">
          Pricing
        </NuxtLink>
        <h2 class="text-white text-xl mt-2">Sometimes all you need is a little push...</h2>
        <p class="text-zinc-400">We truly believe there a big ideas around, but sometimes the missing piece is a
          starting point.</p>
        <p class="text-zinc-400">Our template is free to use, we'd love to read from you on <a href="">x.com</a>.</p>
      </div>

      <div class="text-center mt-20" id="testimonials">
        <NuxtLink class="text-[#D65320] font-semibold text-sm" to="#testimonials">
          Build with nuxt-hub-landing
        </NuxtLink>
        <h2 class="text-white text-xl mt-2">Focus on the part that matters...</h2>
        <p class="text-zinc-400">It's free</p>
        <p class="text-zinc-400">It's free</p>

        <div class="text-left mt-8 grid grid-cols-3 gap-5">
          <TestimonialCard name="evoize.me" description="" :author="{fullName: 'Josef F.', role: 'CTO', avatar: ''}"/>
          <TestimonialCard name="suddy.me"
                           description="I had this idea of a surf app, but is there a need? Didnt know, in 50 minutes i had a landing page to collect potential users."
                           :author="{fullName: 'Tobias L.', role: 'Founder', avatar: ''}"/>
          <TestimonialCard name="nuxt-hub-landing.com" description=""
                           :author="{fullName: 'Tobias L.', role: 'Founder', avatar: ''}"/>
        </div>
      </div>

    </div>
  </div>

  <footer class="mt-64 bg-zinc-900">
    <div class="max-w-6xl mx-auto text-zinc-500 py-3">
      <a href="" class="text-[#D65320]">© {{ currentYear }} NuxtHubLanding</a>
    </div>
  </footer>
</template>
