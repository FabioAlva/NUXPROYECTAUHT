<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField } from '@nuxt/ui'
import { authClient } from '../lib/auth-client';

interface propsForms {
  fields: AuthFormField[],
  validations: z.ZodType<any, any> ,
  title : string,
  onSubmit: (data: any) => void
}

const props = defineProps<propsForms>()

</script>
<template>
  <div class="flex flex-col w-full items-center justify-center gap-4 p-4">
    <UPageCard class="bg-transparent" variant="soft">
      <UAuthForm :ui="{title : 'text-[var(--color-tgi-color)]' }"
        :schema="props.validations"
        :title="props.title"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :fields="props.fields"
        @submit="props.onSubmit"
      />
    </UPageCard>
  </div>

</template>