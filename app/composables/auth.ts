import type { BetterAuthClientOptions, ClientOptions, InferSessionFromClient, InferUserFromClient } from "better-auth";
import { createAuthClient } from 'better-auth/client'
import { authClient } from "~/lib/auth-client";

export function useAuth(){

const url = useRequestURL() ;
const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined

const options = {
    redirectUserTo: '/dashboard', // Logueado
    redirectGuestTo: '/'
}

 const client = authClient
const session = useState<InferSessionFromClient<BetterAuthClientOptions> | null>('auth:session', () => null)
const user = useState<InferUserFromClient<BetterAuthClientOptions> | null>('auth:user', () => null)
const sessionFetching = import.meta.server ? ref(false) : useState('auth:sessionFetching', () => false)

const fetchSession = async () => {
    if (sessionFetching.value) return
    
    sessionFetching.value = true
    
    try {
      const { data } = await client.getSession({
        fetchOptions: {
          headers 
        }
      })
      
      session.value = data?.session || null
      user.value = data?.user || null
      
      return data
    } catch (error) {
      console.error("Error en fetchSession:", error)
      session.value = null
      user.value = null
    } finally {
      sessionFetching.value = false
    }
  
  }

if (import.meta.client) {
    client.$store.listen('$sessionSignal', async (signal) => {
      if (!signal) return
      await fetchSession()
    })
  }

  return {
    session,
    user,
    loggedIn: computed(() => !!session.value),
    signIn: client.signIn,
    signUp: client.signUp,
    async signOut({ redirectTo }: { redirectTo?: string } = {redirectTo: '/'}) {
      const res = await client.signOut()
      session.value = null
      user.value = null
      if (redirectTo) {
        await navigateTo(redirectTo)
      }
      return res
    },
    options,
    fetchSession,
    client
  }
}
