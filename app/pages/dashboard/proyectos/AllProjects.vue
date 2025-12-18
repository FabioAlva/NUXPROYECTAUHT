<script setup lang="ts">
import { h, resolveComponent } from 'vue'

definePageMeta({
  layout: 'dashboard-layout'
})

// 1. Definimos la estructura de los datos (TypeScript)
type User = {
  id: number
  name: string
  email: string
  role: string
  status: 'Activo' | 'Inactivo'
}

// 2. Resolvemos el componente UBadge para usarlo dentro de la tabla
const UBadge = resolveComponent('UBadge')

// 3. Data de prueba (Mock Data)
const users = ref<User[]>([
  { id: 1, name: 'Ana García', email: 'ana.garcia@empresa.com', role: 'Admin', status: 'Activo' },
  { id: 2, name: 'Carlos López', email: 'carlos.lopez@empresa.com', role: 'Editor', status: 'Inactivo' },
  { id: 3, name: 'Maria Rodriguez', email: 'maria.r@empresa.com', role: 'Viewer', status: 'Activo' },
  { id: 4, name: 'Juan Perez', email: 'juan.perez@empresa.com', role: 'Editor', status: 'Activo' },
  { id: 5, name: 'Sofia Torres', email: 'sofia.torres@empresa.com', role: 'Viewer', status: 'Inactivo' },
])

// 4. Definición de columnas
const columns = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    class: 'font-medium' // Pone el nombre en negrita
  },
  {
    accessorKey: 'email',
    header: 'Correo Electrónico'
  },
  {
    accessorKey: 'role',
    header: 'Rol'
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    // Función para renderizar el Badge de color
    cell: ({ row }: { row: any }) => {
      const status = row.getValue('status')
      const color = status === 'Activo' ? 'green' : 'gray'
      
      return h(UBadge, { color, variant: 'subtle' }, () => status)
    }
  },
  {
    id: 'actions',
    header: '' // Columna vacía para botones de acción futuros
  }
]
</script>

<template>
  <TabletComp 
    title="Listado de Usuarios"
    :data="users"
    :columns="columns"
  >
    
    <template #filters>
      
      <UInput 
        icon="i-heroicons-magnifying-glass-20-solid" 
        placeholder="Buscar..." 
        class="w-64" 
      />
      
      <USelect 
        :options="['Activo', 'Inactivo']" 
        placeholder="Estado" 
        class="w-40"
      />
      
      <UButton icon="i-heroicons-arrow-down-tray" variant="ghost">
        Exportar
      </UButton>

    </template>

  </TabletComp>
</template>