// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  modules: ["@nuxt/ui"],
  css: ["./app/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
  devtools: { enabled: false },
});
