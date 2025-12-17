
<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField } from '@nuxt/ui';
import { authClient } from '../lib/auth-client'

const fields: AuthFormField[] = [
  {
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
  }, 
  {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox'
  }
]

const validations = z.object({
  email: z.string().email('Invalid email'), // Corrección menor en sintaxis Zod
  password: z.string().min(8, 'Must be at least 8 characters')
})

    const onSubmit = async ({ data }: any) => {
  const { email, password, remember } = data
  const { data: result, error } = await authClient.signIn.email(
    {
      email,
      password,
      rememberMe: remember,
      callbackURL: '/dashboard'
    }
  )
  
  if (error) {
    console.error(error) 
  }
}
</script>

<template>
  <UPage>
    <div class="flex items-center h-screen bg-white">
      <div class="hidden md:flex bg-[#005A94] h-screen w-1/2"></div>  
      <div class="flex justify-center h-screen w-full md:w-1/2 items-center">  
        <AuthFormComp 
            :fields="fields" 
            :validations="validations" 
            :title="'Sign In'"
            :onSubmit="onSubmit"
        />
      </div>
    </div>
  </UPage>
</template>
