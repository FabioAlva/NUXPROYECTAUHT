<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import { authClient } from '../lib/auth-client'

const toast = useToast()
const session = authClient.useSession()

onMounted(async () => {
  if (session.value?.data) {
    await navigateTo('/dashboard')
  }
})

const fields: AuthFormField[] = [{
  name: 'name',
  type: 'text',
  label: 'Name',
  placeholder: 'Enter your name',
  required: true
}, {
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
}, {
  name: 'confirmPassword',
  label: 'Confirm Password',
  type: 'password',
  placeholder: 'Confirm your password',
  required: true
}]

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type Schema = z.output<typeof schema>

const loading = ref(false)

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true
  
  try {
    const result = await authClient.signUp.email({
      name: payload.data.name,
      email: payload.data.email,
      password: payload.data.password,
      callbackURL: '/dashboard'
    })

    if (result.error) {
      toast.add({
        title: 'Error',
        description: result.error.message || 'Failed to create account',
      })
    }
    
    else {
        toast.add({
        title: 'Success',
        description: 'Account created successfully!',
      })
    
      // Redirigir al login o dashboard
      navigateTo('/login')
    }
  } catch (error) {
    
    toast.add({
      title: 'Error',
      description: 'An error occurred during registration',
    
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
        title="Create Account"
        description="Enter your information to create a new account."
        icon="i-lucide-user-plus"
        :fields="fields"
        :loading="loading"
        @submit="onSubmit"
      >
        <template #footer>
          <div class="text-center text-sm">
            Already have an account?
            <UButton variant="link" to="/login" :padded="false">
              Sign in
            </UButton>
          </div>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>