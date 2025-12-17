<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField } from '@nuxt/ui'

export interface AuthFormFieldsProps {
  name: string,
  label: string,
  type: string,
  placeholder?: string,
  required?: boolean,
  icon?: string,
}

interface propsForms {
  fields: AuthFormFieldsProps[],
  validations: z.ZodType<any, any> ,
  title : string,
  onSubmit: (data: any) => void ,
  state: Partial<any>,
}



const props = defineProps<propsForms>()
</script>

<template>
  <div class="flex flex-col w-full items-center justify-center gap-4 p-4">
      <UForm :schema="props.validations" :state="props.state" @submit="props.onSubmit" class="flex flex-col min-w-[400px] h-full gap-5">
    <UFormField 
  v-for="field in props.fields" 
  :key="field.name" 
  :ui="{ label: 'text-[var(--color-venice-blue-800)]' }" 
  :label="field.label" 
  :name="field.name"
>
  <UInput 
    v-model="props.state[field.name]" 
    :type="field.type"  :placeholder="field.placeholder" 
    class="w-full min-w-full" 
    :ui="{ base: 'bg-transparent text-[var(--color-venice-blue-800)]' }"
  />
</UFormField>
      <UButton type="submit">
      Submit
    </UButton>
     
  </UForm>
  </div>
  </template>
  
 