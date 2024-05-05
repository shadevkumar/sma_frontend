// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-icon"],
  plugins: ["~/plugins/useAuthCookies"],
  runtimeConfig: {
    public: {
      SMA_API_URL: process.env.SMA_API_URL,
    },
  },
});
