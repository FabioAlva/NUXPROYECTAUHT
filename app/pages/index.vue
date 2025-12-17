
<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField } from '@nuxt/ui';
import { authClient } from '../lib/auth-client'
import type { AuthFormFieldsProps } from '~/components/AuthFormComp.vue';

definePageMeta({
//  layout: 'auth', 
auth: {
    only: 'guest',
    redirectUserTo: '/dashboard',
    redirectGuestTo: '/'
  }
})

useSeoMeta({
  title: 'Iniciar sesión | TGIPROYECTS'
})

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
  }, 
  {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox'
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
            :state="state"
        />
      </div>
    </div>
  </UPage>
</template>
