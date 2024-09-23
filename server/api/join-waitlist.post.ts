import {useDrizzle} from "~/server/utils/drizzle";
import {consola} from "consola";
import {useValidatedBody, z} from "h3-zod";

export default defineEventHandler(async event => {
    consola.info("User trying to signup for waitlist...")

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


    const entry = await useDrizzle().insert(tables.waitlist).values({
        email,
        createdAt: new Date(),
    }).returning().get()


    consola.info(`User ${entry.email} is now on waitlist...`)

    return entry
})
