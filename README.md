# NuxtHubLanding - Landing Page Boilerplate
The Nuxt boilerplate for building yor landing page in minutes, while deploy it with NuxtHub.

> Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Tech Stack
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Nuxt.js](https://img.shields.io/badge/Nuxt.js-002E3B?logo=nuxtdotjs&logoColor=#00DC82)](https://www.nuxt.com/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss)](https://tailwindcss.com/)

- [Typescript](https://www.typescriptlang.org/) - Language
- [Nuxt.js](https://www.nuxt.com/) - Framework
- [Drizzle](https://orm.drizzle.team/)  - ORM
- [Tailwind](https://tailwindcss.com/) - CSS
- [NuxtHub](https://hub.nuxt.com) - Hosting

## Prerequisites
- [NuxtHub](https://hub.nuxt.com/) Account

## Setup

```bash
# clone repository
git clone https://github.com/lowbits/nuxt-hub-landing.git [YOUR_APP_NAME]
cd [YOUR_APP_NAME]

# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Deploy

Deploy the application to NuxtHub

```bash
npx nuxthub deploy

# Choose
# Deploy <link> to NuxtHub?: Yes
# Select a project: Create a new project
# Project name: [YOUR_APP_NAME]
# Select a region for the storage: [YOUR_REGION]
# Production branch: main
```

> Run the migrations

```bash
npx nuxt dev --production
```

Check out the [deployment documentation](https://hub.nuxt.com/docs/getting-started/deploy) for more information.


## Roadmap
- [X] Add rate limiting via [NuxtSecurity](https://nuxt-security.vercel.app/documentation/middleware/rate-limiter)
- [ ] Add Double-Opt-in
- [ ] Add more basic components
    - [ ] Faq-Area
    - [ ] Pricing-Area
- [ ] Add ability of customisation via config
- [ ] Add light mode

