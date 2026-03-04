import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBackendUrl: process.env.NUXT_PUBLIC_API_BACKEND_API_URL,
      apiBackendKey: process.env.NUXT_PUBLIC_BACKEND_API_KEY,
      apiBackendPort: process.env.NUXT_PUBLIC_BACKEND_API_PORT
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
