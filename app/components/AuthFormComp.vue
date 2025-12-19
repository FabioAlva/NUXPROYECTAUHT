<script setup lang="ts">
import * as z from 'zod'
import type LogoVue from './Logo.vue';

export interface AuthFormFieldsProps {
  id: number,
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
  footerMesage?: string,
  LabelfooterSubmit?: string,
  footerSubmit?: () => void,
}

const props = defineProps<propsForms>()

  // Se define un objeto con record el cual permite crear claves dinamicas , Con string y booland definimos que sera un objeto con claves string y valores booleanos
const visibility = reactive<Record<string, boolean>>({})

const toggleVisibility = (fieldName: string) => {
  visibility[fieldName] = !visibility[fieldName]
}

</script>


<template>

  <div class="flex flex-col w-full items-center justify-center gap-4 p-4">
    <div class="w-[400px] justify-start">
    <Logo :color="'var(--color-venice-blue-800)'"/>         
    </div>

<hr class="w-[400px] border-t border-[var(--color-venice-blue-800)]">
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
          :type="field.type === 'password' && visibility[field.name] ? 'text' : field.type" 
          :placeholder="field.placeholder" 
          class="w-full min-w-full input-hack" 
          :ui="{ base: 'bg-transparent text-[var(--color-venice-blue-800)]' }"
        >

          <template #trailing v-if="field.type === 'password'">
            <UButton
              variant="ghost"
              :icon="visibility[field.name] ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :padded="false"
              @click="toggleVisibility(field.name)"
            />
          </template>


        </UInput>
</UFormField>

<div class=" justify-center items-center flex">
<UButton icon="i-lucide-arrow-right" type="submit" class="justify-center items-center flex w-[60px] h-[60px] rounded-e-full bg-[var(--color-venice-blue-800)] text-white"></UButton>
</div>

 <div class="flex w-full justify-center items-center gap-2" > 
           <p> {{ props.footerMesage }}</p>
         <UButton 
           :label="props.LabelfooterSubmit || ''" 
          @click="props.footerSubmit?.()"
           :ui="{base:'bg-transparent text-[var(--color-venice-blue-800)] font-bold' }"
         />
        </div>
</UForm>

</div>
  </template>
  
 <style>
/* Hide the password reveal button in Edge */
::-ms-reveal {
    display: none;
}
</style>