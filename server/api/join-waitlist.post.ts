import {useDrizzle} from "~/server/utils/drizzle";
import {consola} from "consola";
import {useValidatedBody, z} from "h3-zod";

import {render} from "@vue-email/render";
import VerifyTemplate from "~/emails/VerifyEmail.vue";
import {generateSecureToken} from "~/utlis/helpers";
import {waitlist} from "~/server/database/schema";


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

    console.debug("Sending email..")


    await emails.send({
        from: "NuxtHubLanding <hello@nhl.lowbits.de>",
        to: 'hallo@tobiaslobitz.de',
        subject: "Confirm your email on NuxtHubLanding",

        html: await render(VerifyTemplate, {
            appName: 'NuxtHubLanding',
            link: `http://localhost:3000/verify?email=${email}&token=${generateSecureToken(email)}`
        }, {pretty: true})
    })

    setResponseStatus(event, 201)
})
