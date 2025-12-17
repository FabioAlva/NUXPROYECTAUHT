<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Menu'
    },
    {
      label: 'Guide',
      icon: 'i-lucide-book-open',
      children: [
        {
          label: 'Introduction',
          description: 'Fully styled and customizable components for Nuxt.',
          icon: 'i-lucide-house'
        },
        {
          label: 'Installation',
          description: 'Learn how to install and configure Nuxt UI in your application.',
          icon: 'i-lucide-cloud-download'
        },
        {
          label: 'Icons',
          icon: 'i-lucide-smile',
          description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
        },
        {
          label: 'Colors',
          icon: 'i-lucide-swatch-book',
          description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
        },
        {
          label: 'Theme',
          icon: 'i-lucide-cog',
          description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
        }
      ]
    },
   
  ],
 
])

</script>

<template>

 <div class="h-full bg-[var(--color-venice-blue-800)] flex flex-col w-[300px]">
      <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-full" :ui="{
      link: 'text-white hover:text-orange-700',
      linkLeadingIcon: 'text-white',
      indicator: 'bg-blue-600'
    }"
    
    />
  </div>
</template>

