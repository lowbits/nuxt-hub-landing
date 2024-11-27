import {addServerHandler, createResolver, defineNuxtModule, logger, extendPages} from 'nuxt/kit'
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
    async setup(options: ModuleOptions, nuxt: Nuxt) {
        const {resolve} = createResolver(import.meta.url)


        nuxt.options.runtimeConfig.landing = defu(
            nuxt.options.runtimeConfig.landing,
            {
                appName: options.appName ?? process.env.NUXT_HUB_APPLICATION_NAME,
                email: options.email ?? process.env.NUXT_HUB_LANDING_EMAIL,
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

            nuxt.hook('tailwindcss:config', function (tailwindConfig) {
                const contentPath = `${resolve('./pages')}/**/*.{vue,js,ts}`
                tailwindConfig.content.files.push(contentPath)
            })

            addServerHandler({
                route: '/api/verify',
                handler: resolve('./runtime/verify.patch')
            })

            extendPages((pages) => {
                pages.push({
                    name: 'Verify',
                    path: '/verify',
                    file: resolve('./pages/verify.vue'),
                })
            })
        }
    }
})
