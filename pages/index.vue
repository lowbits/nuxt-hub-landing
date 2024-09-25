<script setup lang="ts">
import TestimonialCard from "~/components/ui/cards/TestimonialCard.vue";
import ContentBlock from "~/components/ui/content/ContentBlock.vue";
import Button from "~/components/ui/buttons/Button.vue";
import Card from "~/components/ui/cards/Card.vue";
import {$fetch} from "ofetch";


const email = ref('')
const joiningWaitlist = ref(false)
const success = ref(false)
const errors = ref<{ code: string, message: string, path: string [], validation: string }[]>([])

const joinWaitlist = async () => {
  joiningWaitlist.value = true
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
      case 429: {
        errors.value = [{
          path: ['server'],
          message: 'You’ve made too many requests in a short period. Please wait a moment and try again.'
        }]
        break;
      }
    }
  } finally {
    joiningWaitlist.value = false
  }
}
</script>


<template>
  <div class="px-6 xl:px-0">
    <header class="sticky top-0">
      <nav class="flex justify-end max-w-6xl mx-auto py-2">
        <div>
          <a href="https://github.com/lowbits/nuxt-hub-landing" target="_blank" rel="noreferrer"><img
              class="size-5"
              src="/assets/logos/github-mark-white.svg" alt="Github Logo"></a>
        </div>
      </nav>
    </header>
    <div class="mt-20 max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row md:justify-between">
        <div class="max-w-lg">
        <span class="px-1.5 py-1 text-xs bg-[#D65320] bg-opacity-80 text-gray-300">
          💡 Validate Your Idea's
        </span>
          <h1 class="mt-1.5 text-white text-5xl tracking-tight">
            Setup your <span
              class="inline bg-gradient-to-r from-[#D65320] to-[#C33E59] bg-clip-text font-display text-transparent">Landing Page</span>
            in minutes</h1>

          <p class="mt-4 text-sm/6 text-gray-300">
            Save time using the <strong class="text-[#D65320]">#NuxtHubLanding</strong> boilerplate, to verify your
            ideas. Deploy it for
            free on NuxtHub, collect leads for your next big thing.
          </p>

          <p class="text-white font-semibold text-sm mt-2">Clone it, customize it, commercialize it.</p>

          <div class="mt-20">
            <form class="relative max-w-md overflow-hidden" @submit.prevent="joinWaitlist">
              <div>
                <div class="flex items-center gap-2 justify-between px-4 py-1.5 border border-[#D65320] rounded-lg">
                  <label for="email" class="sr-only">E-Mail</label>
                  <input
                      class="px-2 md:px-4 py-1 md:py-2 flex-1 bg-transparent text-white transition-colors hover:bg-zinc-900 ease-linear duration-300  rounded"
                      v-model="email" id="email" required
                      type="text" placeholder="E-Mail Address"/>
                  <Button
                      :loading="joiningWaitlist"
                      type="submit">Join
                    Waitlist
                  </Button>
                </div>
                <p class="text-base/6 text-red-500 data-[disabled]:opacity-50 sm:text-sm/6"
                   v-for="error in errors">{{ error.path.join(',') }}: {{ error.message }}</p>
              </div>

              <Transition
                  enter-from-class="opacity-0 translate-y-full"
                  enter-active-class="transition ease-in-out duration-150"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-active-class="transition -translate-y-full ease-out duration-150"
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

        <div class="mt-32 relative mx-auto w-[200px] md:mx-0 md:w-[100px]">
          <p class="bg-zinc-900 leading-none absolute -top-10 -left-2 px-1.5 py-1 text-xs  text-gray-300">
            Build with
          </p>
          <ul class="space-y-5">
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

      <ContentBlock class="mt-32" anchor="pricing">
        <template #term>
          Features
        </template>

        <template #headline>
          Focus on the part that matters...
        </template>

        <template #description>
          Verify your idea before jumping into implementation — it saves time and gray hairs.
        </template>


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
      </ContentBlock>


      <ContentBlock class="mt-32" anchor="pricing">
        <template #term>
          Pricing
        </template>

        <template #headline>
          Sometimes all you need is a little push...
        </template>

        <template #description>
          Our template is free to use, we'd love to read from you on <a href="">x.com</a>.
        </template>
      </ContentBlock>

      <ContentBlock class="mt-32" anchor="build-with-nuxthublanding" alignment="center">
        <template #term>
          Build with <strong>#NuxtHubLanding</strong>
        </template>

        <template #headline>
          Launch Fast. Validate Faster.
        </template>

        <template #description>
          Hear firsthand how our boilerplate has empowered startups and indiepreneurs to quickly create landing pages,
          validate their ideas, and focus on building their core products.
        </template>

        <TestimonialCard name="evoize.me"
                         description="Our team of five set out to build an open-source alternative to SevDesk for freelancers. To gauge interest, we used NuxtHubLanding to quickly set up a professional landing page, allowing us to focus on understanding our audience and refining our idea."
                         :author="{fullName: 'Christian H.', role: 'CTO', avatar: ''}"/>
        <TestimonialCard name="cardict"
                         description="We focused on building our React Native app and needed a quick, cost-effective landing page solution. The NuxtHubLanding boilerplate let us launch a professional, responsive site in just two hours, saving us development time and making a strong first impression."
                         :author="{fullName: 'Raul L.', role: 'Co-Founder', avatar: ''}"/>
        <TestimonialCard name="suddy.me"
                         description="Plentiful App ideas, creating landing pages was time-consuming and expensive. This challenge led me to develop NuxtHubLanding, a quick and cost-effective solution for launching professional sites. It allows me to focus on building apps without worrying about landing page setup."
                         :author="{fullName: 'Tobias L.', role: 'Founder', avatar: ''}"/>


      </ContentBlock>
    </div>
  </div>
</template>
