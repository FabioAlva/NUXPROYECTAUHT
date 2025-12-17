
<script setup lang="ts">

import * as z from 'zod'
import { authClient } from '~/lib/auth-client'
import type { AuthFormFieldsProps } from '~/components/AuthFormComp.vue'

const fields: AuthFormFieldsProps[] = [  
{
    name: 'name',
    label: 'Nombre Completo',
    type: 'text',
    placeholder: 'Ingresa tu nombre completo',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Correo Electrónico',
    placeholder: 'Ingresa tu correo electrónico',
  },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Ingresa tu contraseña',
  },
]


const validations  = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})


const state = reactive<Partial<typeof validations>>({
})


const onSubmit = async ({ data }: any) => {
  const { email, password, name, image } = data
  console.log(JSON.stringify(data,null,2))
  const { data: result, error } = await authClient.signUp.email(
    {
      email,
      password,
      name,
      callbackURL: '/'
    }
  )

  if (error) {
  }

}

</script>
<template>
  <UPage>
    <div class="flex h-screen bg-white">
      <div class="hidden md:flex bg-[#005A94] w-1/2" />
      <div class="flex w-full md:w-1/2 items-center justify-center">
       <AuthFormComp :fields="fields" :validations="validations" title="Sign Up" :onSubmit="onSubmit" :state="state"/>
      </div>
    </div>
  </UPage>
</template>