import {addServerHandler, createResolver, defineNuxtModule, logger, useRuntimeConfig} from 'nuxt/kit'
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
        configKey: "landing",
    },
    defaults: {
        email: undefined,
        appName: undefined,
        verifyEmail: false,
    },
    setup(options: ModuleOptions, nuxt: Nuxt) {
        const {resolve} = createResolver(import.meta.url)


        nuxt.options.runtimeConfig.landing = defu(
            nuxt.options.runtimeConfig.landing,
            {
                appName: options.appName ?? process.env.NUXT_APPLICATION_NAME,
                email: options.email,
                verifyEmail: options.verifyEmail
            },
        );

        nuxt.options.runtimeConfig.resend = defu(
            nuxt.options.runtimeConfig.resend,
            {
                apiKey: process.env.NUXT_HUB_RESEND_API_KEY,
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
