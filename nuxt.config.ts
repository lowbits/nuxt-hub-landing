import vue from '@vitejs/plugin-vue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: [
        '@nuxthub/core',
        '@nuxtjs/tailwindcss',
        'nuxt-security',
        'nuxt-resend',
    ],

    components: {
        dirs: [
            '~/components',
            {
                path: '~/emails',
                extensions: ['vue'],
            },
        ],
    },

    routeRules: {
        '/api/join-waitlist': {
            security: {
                rateLimiter: {
                    tokensPerInterval: 1
                }
            }
        }
    },

    hub: {
        database: true
    },

    nitro: {
        rollupConfig: {
            plugins: [vue()]
        },
    },
})
