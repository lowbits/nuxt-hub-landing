import {useDrizzle} from "~/server/utils/drizzle";
import {useValidatedBody, z} from "h3-zod";

import {render} from "@vue-email/render";
import VerifyTemplate from "~/emails/VerifyEmail.vue";
import {generateSecureToken} from "~/utlis/helpers";
import {consola} from "consola";
import {getRequestURL} from "h3";


export default defineEventHandler(async event => {
    consola.info("User trying to signup for waitlist...")
    const {emails} = useResend();


    const {email} = await useValidatedBody(event, z.object(
        {
            email: z.string().email().refine(async (email) => {
                const alreadyExists = await useDrizzle().query.waitlist.findFirst({
                    where: (waitlist, {eq}) => (eq(waitlist.email, email)),
                })

                return !alreadyExists
            }, 'Email already in use')
        }
    ))


    consola.info("User joining waitlist...")


    let entry = await useDrizzle().insert(tables.waitlist).values({
        email,
        createdAt: new Date(),
    }).returning().get()


    consola.info(`User ${entry.email} is now on waitlist...`)

    const nuxtHubLandingConfig = useRuntimeConfig().nuxtHubLanding


    const shouldSendVerifyEmail = nuxtHubLandingConfig?.verifyEmail

    if (shouldSendVerifyEmail) {
        consola.info(`User ${entry.email} needs to verify email...`)

        const appName = nuxtHubLandingConfig?.appName ?? process.env.NUXT_APPLICATION_NAME
        const url = getRequestURL(event)

        console.debug("Sending email..")
        await emails.send({
            from: `NuxtHubLanding <${nuxtHubLandingConfig.email}>`,
            to: entry.email,
            subject: `Confirm your email on ${appName}`,

            html: await render(VerifyTemplate, {
                email: entry.email,
                appName: appName,
                link: `${url.origin}/verify?email=${email}&token=${generateSecureToken(email)}`
            }, {pretty: true})
        })
    }


    setResponseStatus(event, 201)
})
