import {useDrizzle} from "~/server/utils/drizzle";
import {consola} from "consola";
import {useValidatedBody, z} from "h3-zod";

import {render} from "@vue-email/render";
import Verify from "~/emails/Verify.vue";
import {generateSecureToken} from "~/utlis/helpers";
import {waitlist} from "~/server/database/schema";


export default defineEventHandler(async event => {
    consola.info("User trying to verify email ...")


    const {email} = await useValidatedBody(event, z.object(
        {
            token: z.string(),
            email: z.string().email().refine(async (email) => {
                const alreadyVerified = await useDrizzle().query.waitlist.findFirst({
                    where: [
                        (waitlist, {eq}) => eq(waitlist.email, email),
                        (waitlist, {isNotNull}) => isNotNull(waitlist.verifiedAt)
                    ],
                })

                return !alreadyVerified
            }, 'Email already verified...')
        }
    ))


    consola.info("User verifying email...")


    const entry = await useDrizzle().update(tables.waitlist).set({
        verifiedAt: new Date(),
    }).where(eq(waitlist.email, email))
        .returning()
        .get()


    consola.info(`User ${entry.email} is now verified...`)


    return entry
})
