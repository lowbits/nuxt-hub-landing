import {useDrizzle} from "~/server/utils/drizzle";
import {useValidatedBody, z} from "h3-zod";

import {render} from "@vue-email/render";
import VerifyTemplate from "~/emails/VerifyEmail.vue";
import {consola} from "consola";
import {getRequestURL} from "h3";
import {generateVerifyUrl} from "~/utlis/helpers";


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

    const config = useRuntimeConfig()


    if (config.landing.verifyEmail) {
        consola.info(`User ${entry.email} needs to verify email...`)


        const url = getRequestURL(event)
        const appName = config.landing.appName

        consola.debug("Sending email..")

        await emails.send({
            from: `NuxtHubLanding <${config.landing.email}>`,
            to: entry.email,
            subject: `Confirm your email on ${appName}`,
            html: await render(VerifyTemplate, {
                email: entry.email,
                appName,
                link: generateVerifyUrl(url.origin, entry.email)
            }, {pretty: true})
        })
    }


    setResponseStatus(event, 201)
})
