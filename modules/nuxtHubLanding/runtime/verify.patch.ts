import {useDrizzle} from "~/server/utils/drizzle";
import {useValidatedBody, z} from "h3-zod";
import {waitlist} from "~/server/database/schema";
import {compareToken} from "~/utlis/helpers";
import {and, isNull} from "drizzle-orm";
import {consola} from "consola";


export default defineEventHandler(async event => {
    consola.info("User trying to verify email ...")



    const {email, token} = await useValidatedBody(event, z.object(
        {
            token: z.string(),
            email: z.string().email()
                .transform(val => decodeURIComponent(val))
                .refine(async (email) => {
                    console.log("EMAIL TO CHECK", email)
                    const alreadyVerified = await useDrizzle().query.waitlist.findFirst({
                        where: and(
                            eq(waitlist.email, email),
                            isNull(waitlist.verifiedAt),
                        ),
                    })

                    return alreadyVerified !== undefined
                }, 'Email already verified.')

        }
    ))


    if (!compareToken(email, token)) {
        consola.error("token mismatch...")
        throw createError({
            statusCode: 403,
            message: 'Token mismatch',
        })
    }


    consola.info("User verifying email...")

    const entry = await useDrizzle().update(tables.waitlist).set({
        verifiedAt: new Date(),
    }).where(eq(waitlist.email, email))
        .returning()
        .get()


    consola.info(`User ${entry.email} is now verified...`)


    return entry
})
