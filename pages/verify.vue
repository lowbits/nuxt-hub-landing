<script setup lang="ts">

const route = useRoute()


const token = computed(() => route.query.token)
const email = computed(() => route.query.email)

const {data, error} = useFetch('/api/verify', {
  method: 'PATCH',
  body: {
    token: token.value,
    email: email.value
  }
})
</script>

<template>
  <div class="bg-white">

    <p >

      {{ route.query }}
    </p>

    <pre >{{ data }}</pre>
    <pre >{{ error }}</pre>
  </div>
</template>
