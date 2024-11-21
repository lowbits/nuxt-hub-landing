<script setup lang="ts">
const route = useRoute()


const token = computed(() => route.query.token)
const email = computed(() => route.query.email)

const {data, error, status} = useFetch('/api/verify', {
  method: 'PATCH',
  body: {
    token: token.value,
    email: email.value
  }
})
</script>

<template>
  <div class="bg-white flex justify-center">

    <div class="mt-40 text-center inline-flex flex-col items-center">
      <template v-if="status === 'success'">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               class="fill text-green-900 size-20">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"/>
          </svg>
        </div>

        <p class="mt-6 text-zinc-500 font-semibold text-sm leading-none">You're in!</p>
        <p class="mt-2 text-xl font-semibold leading-5 ">
          Get ready for awesome updates in your inbox.
        </p>
      </template>

      <template v-if="error">

        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="fill text-yellow-500 size-20">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
          </svg>

        </div>
        <p class="mt-6 text-zinc-500 font-semibold text-sm leading-none">Something went wrong!</p>
        <p class="mt-2 text-xl font-semibold leading-5 ">
          {{ error.data.data.issues.map((e) => e.message).join() }}
        </p>
      </template>
    </div>


  </div>
</template>
