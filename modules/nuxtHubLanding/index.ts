import {addServerHandler, createResolver, defineNuxtModule, logger} from 'nuxt/kit'
import defu from "defu";

interface ModuleOptions {
    appName?: string
    verifyEmail?: boolean
    email?: string,
    resendApiKey?: string,
}

const log = logger.withTag('nuxtHubLanding')

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'nuxtHubLanding',
    },
    setup(options: ModuleOptions, nuxt: Nuxt) {

        if (options.verifyEmail && (!options.email)) {
            log.error('NuxtHubLanding needs an email address')
            log.info('Please set the parameters in config')
            return process.exit(1)
        }


        const {resolve} = createResolver(import.meta.url)


        nuxt.options.runtimeConfig.nuxtHubLanding = defu(
            nuxt.options.runtimeConfig.nuxtHubLanding,
            {
                email: options.email,
                verifyEmail: options.verifyEmail,
            },
        );


        nuxt.options.runtimeConfig.resend = defu(
            nuxt.options.runtimeConfig.resend,
            {
                apiKey: process.env.NUXT_RESEND_API_KEY,
            },
        );

        log.info("🛬 initializing nuxtHubLanding")

        addServerHandler({
            route: '/api/join-waitlist',
            handler: resolve('./runtime/join-waitlist.post')
        })

        if (options.verifyEmail) {
            log.info("💌 verify email is turned on")
            addServerHandler({
                route: '/api/verify',
                handler: resolve('./runtime/verify.patch')
            })
        }


    }
})
