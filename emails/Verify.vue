<script setup lang="ts">
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Section,
  Tailwind,
  Text,
  Preview
} from '@vue-email/components'


withDefaults(defineProps<{ email: string, appName: string, link: string }>(), {
  email: 'test@app.de',
  appName: 'NuxtHubLanding'
})
</script>

<template>
  <Tailwind>
    <Html>
    <Head/>
    <Preview>Verify your email address</Preview>
    <Body class="bg-white my-auto mx-auto font-sans">
    <Container class="border border-solid border-[#eaeaea] p-[20px] md:p-7 rounded my-[40px] mx-auto max-w-[465px]">
      <Section class="mt-[32px] text-center">
        {{ appName }}
      </Section>
      <Heading class="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
        <strong>You're almost there</strong>
      </Heading>
      <Text class="text-black text-[14px] leading-[24px]">
        To finish signing up, just click the button below to verify that you're a part of {{ appName }}.
      </Text>


      <Section class="text-center mt-[32px] mb-[32px]">
        <Button :style="{
              padding: '10px 20px'
            }" class="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center" :href="link">
          Verify my email
        </Button>
      </Section>
      <Text class="text-black text-[14px] leading-[24px]">
        or copy and paste this URL into your browser:
        <Link :href="link" class="text-blue-600 no-underline">
          {{ link }}
        </Link>
      </Text>
      <Hr class="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full"/>
      <Text class="text-[#666666] text-[12px] leading-[24px]">
        This invitation was intended for
        <span class="text-black">{{ email }} </span>. If you were not expecting this invitation, you can ignore this
        mail. If you are concerned about your account's safety, please reply to this mail to get in touch
        with us.
      </Text>
    </Container>
    </Body>
    </Html>
  </Tailwind>
</template>
