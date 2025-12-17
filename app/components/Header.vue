<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
const route = useRoute()
const items = computed<NavigationMenuItem[]>(() => [
])


</script>

<template>
  <div>
  <UHeader class="bg-[var(--color-venice-blue-800)]  shadow-xl z-20 border-none"  :ui="{ 
      container: 'max-w-full px-20'  }">
    <template #title>
      <div class="w-full h-full flex justify-center items-center gap-1">
         <Logo />
      <UButton icon="i-heroicons-bars-3" class="bg-transparent w-[40px] h-[40px] items-center justify-center"/>

      </div>
  
    </template>

    <UNavigationMenu :items="items" :ui="{
      link: 'text-white hover:text-blue-700',
      linkLeadingIcon: 'text-blue-400',
      indicator: 'bg-blue-600'
    }"/>

    <template #right>
      <UColorModeButton />
      <UButton to="/login" label="Login" />
            <UButton to="/register" label="Register" />

    </template>

</UHeader>
</div>

</template>
