<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField } from '@nuxt/ui'
import { authClient } from '~/lib/auth-client'

const fields: AuthFormField[] = [  
{
    name: 'name',
    label: 'Full name',
    type: 'text',
    placeholder: 'Enter your full name',
    required: true
  },
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
    placeholder: 'Min. 8 characters',
    required: true
  },
]
const validations  = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
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
       <AuthFormComp :fields="fields" :validations="validations" title="Sign Up" :onSubmit="onSubmit"/>
      </div>
    </div>
  </UPage>
</template>