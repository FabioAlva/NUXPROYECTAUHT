
<script setup lang="ts">

definePageMeta({
  guestOnly: true
})

import * as z from 'zod'


import type { AuthFormFieldsProps } from '~/components/AuthFormComp.vue'

const { signUp, fetchSession } = useAuth()

const fields: AuthFormFieldsProps[] = [  
{   id:1,
    name: 'name',
    label: 'Nombre Completo',
    type: 'text',
    placeholder: 'Ingresa tu nombre completo',
  },
  { 
    id:2,
    name: 'email',
    type: 'email',
    label: 'Correo Electrónico',
    placeholder: 'Ingresa tu correo electrónico',
  },
  {
    id:3,
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Ingresa tu contraseña',
  }
]


const validations  = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})


const state = reactive<Partial<typeof validations>>({
})
const onSubmit = async ({ data }: any) => {
  const { email, password, name } = data

   const { data: result, error } = await signUp.email({ 
      email,
      password,
      name,
     })

   if (error) {
     console.error(error.message)
     return
   }

  await fetchSession() 
  await navigateTo('/dashboard') 
}


</script>
<template>
  <UPage>
    <div class="flex h-screen bg-white">
      <div class="hidden md:flex bg-[#005A94] w-1/2" />
      <div class="flex w-full md:w-1/2 items-center justify-center">
       <AuthFormComp :fields="fields" :validations="validations" title="Sign Up" :onSubmit="onSubmit" :state="state" :footerMesage="'¿Ya tienes una cuenta?'"
            :LabelfooterSubmit="'Inicia sesión aquí'"
            :footerSubmit="() => navigateTo('/login')"/>
      </div>
    </div>
  </UPage>
</template>