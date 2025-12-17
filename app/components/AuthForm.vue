
<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import { authClient } from '../lib/auth-client'

const toast = useToast()
const session = authClient.useSession()

// ✅ CORRECTO - Solo redirige si YA está autenticado al cargar la página

onMounted(async () => {
  if (session.value?.data) {
    await navigateTo('/dashboard')
  }
})

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
},

{
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
}
]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>
const loading = ref(false)
async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    const result = await authClient.signIn.email({
      email: payload.data.email,
      password: payload.data.password,
      callbackURL: '/dashboard'
    })

    if (result.error) {
      toast.add({
        title: 'Error',
        description: result.error.message || 'Invalid credentials',
      })
    } else {
      toast.add({
        title: 'Success',
        description: 'Logged in successfully',
      })
    }
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'An error occurred during login',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Welcome Back"
        description="Enter your credentials to access your account."
        icon="i-lucide-lock-keyhole"
        :fields="fields"
        :loading="loading"
        @submit="onSubmit"
      >
        <template #footer>
          <div class="text-center text-sm">
            Don't have an account?
            <UButton variant="link" to="/signup" :padded="false">
              Sign up
            </UButton>
          </div>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>