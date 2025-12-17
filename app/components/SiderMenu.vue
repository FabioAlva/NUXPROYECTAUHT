<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Gestión Principal',
      type: 'label'
    },
    {
      label: 'Proyectos',
      icon: 'i-lucide-folder-kanban',
      children: [
        {
          label: 'Vista General',
          description: 'Estado global de todos los proyectos activos.',
          icon: 'i-lucide-layout-dashboard',
          to: '/dashboard/proyectos'
        },
        {
          label: 'Tablero Kanban',
          description: 'Gestiona tareas mediante arrastrar y soltar.',
          icon: 'i-lucide-trello',
          to: '/dashboard/proyectos/kanban'
        },
        {
          label: 'Cronograma (Gantt)',
          description: 'Visualiza la línea de tiempo y dependencias.',
          icon: 'i-lucide-calendar-days',
          to: '/dashboard/proyectos/gantt'
        }
      ]
    },
    {
      label: 'Equipo y Recursos',
      icon: 'i-lucide-users',
      children: [
        {
          label: 'Miembros',
          description: 'Asigna roles y permisos a tu equipo.',
          icon: 'i-lucide-user-plus',
          to: '/dashboard/equipo'
        },
        {
          label: 'Carga de Trabajo',
          description: 'Monitorea la saturación de tareas por persona.',
          icon: 'i-lucide-bar-chart-big',
          to: '/dashboard/equipo/carga'
        }
      ]
    }
  ],
  [
    {
      label: 'Administración',
      type: 'label'
    },
    {
      label: 'Reportes',
      icon: 'i-lucide-file-pie-chart',
      to: '/dashboard/reportes'
    },
    {
      label: 'Configuración',
      icon: 'i-lucide-settings',
      to: '/dashboard/configuracion'
    }
  ]
])

</script>

<template>

 <div class="h-full bg-[var(--color-venice-blue-800)] flex flex-col w-[300px]">
      <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-full" :ui="{
      label: 'text-white hover:text-orange-700',
      link: 'text-white hover:text-orange-700',
      linkLeadingIcon: 'text-white',
      indicator: 'bg-blue-600'
    }"
    
    />
  </div>
</template>

