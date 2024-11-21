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

        if (options.verifyEmail && (!options.email || !options.resendApiKey)) {
            log.error('NuxtHubLanding needs an email-address and a resend-api-key.')
            log.info('Please set the parameters in config')
            return process.exit(1)
        }
        const {resolve} = createResolver(import.meta.url)


        nuxt.options.runtimeConfig.nuxtHubLanding = defu(
            nuxt.options.runtimeConfig.nuxtHubLanding,
            {
                verifyEmail: options.verifyEmail,
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
