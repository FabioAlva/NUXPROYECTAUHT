export default defineNuxtRouteMiddleware(async (to) => {

  if (to.meta.auth === false) {
    return
  }

  const { loggedIn, fetchSession, session, user } = useAuth()
  
  console.log(`[Middleware] Navegando a: ${to.path}`)

  if (!session.value) {
    try {
      await fetchSession()
    } catch (e) {
      console.error('[Middleware] Error fetching session:', e)
    }
  }

  console.log(`[Middleware] Estado -> LoggedIn: ${loggedIn.value}, User: ${user.value?.email}`)

  
  if (!loggedIn.value) {
    if (to.meta.guestOnly) {
      return
    }
    console.log('[Middleware] Acceso denegado. Redirigiendo a /')
    return navigateTo('/')
  }

  if (loggedIn.value) {
    if (to.meta.guestOnly) {
      console.log('[Middleware] Ya logueado. Redirigiendo a /dashboard')
      return navigateTo('/dashboard')
    }
    return
  }
})