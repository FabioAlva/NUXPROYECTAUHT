import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Opcional: evita que las peticiones se reintenten infinitamente si fallan
        retry: 1, 
        // Opcional: evita que se refosque la ventana al cambiar el foco
        refetchOnWindowFocus: false, 
      },
    },
  })

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })
})