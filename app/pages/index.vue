
<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField } from '@nuxt/ui';
import type { AuthFormFieldsProps } from '~/components/AuthFormComp.vue';

definePageMeta({
  guestOnly: true 
})

useSeoMeta({
  title: 'Iniciar sesión | TGIPROYECTS'
})

const { signIn, fetchSession } = useAuth()

const fields : AuthFormFieldsProps[] = [

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
}
]

const state = reactive<Partial<typeof validations>>({
})

const validations = z.object({
  email: z.string().email('Invalid email'), // Corrección menor en sintaxis Zod
  password: z.string().min(8, 'Must be at least 8 characters')
})
const onSubmit = async ({ data }: any) => {
  const { email, password, remember } = data
    const { data: result, error } = await signIn.email({
      email,
      password,
      rememberMe: remember,
    })
  
  if (error) {
    console.error(error) 
    return 
  }
  await fetchSession() 
  await navigateTo('/dashboard')
}
</script>

<template>
  <UPage>
    <div class="flex items-center h-screen bg-white">
      <div class="hidden md:flex bg-[var(--color-venice-blue-800)] h-screen w-1/2"  :style="{ 
    backgroundImage: `linear-gradient(to bottom, rgba(30, 58, 138, 0.7), rgba(30, 58, 138, 0.7)), url('/banner.webp')` 
   }"></div>  
      <div class="flex justify-center h-screen w-full md:w-1/2 items-center">  
        <AuthFormComp 
            :fields="fields" 
            :validations="validations" 
            :title="'Sign In'"
            :onSubmit="onSubmit"
            :state="state"
        />
      </div>
    </div>
  </UPage>
</template>
