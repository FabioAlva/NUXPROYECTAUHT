<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { useFindManyProject } from '../../../../lib/hooks'
import { refDebounced } from '@vueuse/core'

definePageMeta({
  layout: 'dashboard-layout'
})


type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'


const filters = reactive({
  search: '',
  status: '' 
})

const debouncedSearch = refDebounced(computed(() => filters.search), 500)

const queryArgs = computed(() => {
  const where: any = {}
  if (debouncedSearch.value) {
    where.OR = [
      { name: { contains: debouncedSearch.value } }
    ]
  }
  if (filters.status) {
    where.status = filters.status
  }
  return {
    where,
    orderBy: { id: 'desc' as const}
  }
})

const { data: allProjects, isLoading } = useFindManyProject(queryArgs)

const projects  = computed(() => {
  return allProjects.value?.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description ?? '', 
    status : p.status 
  })) || []
})

const UBadge = resolveComponent('UBadge')

const columns = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    class: 'font-medium' 
  },
  {
    accessorKey: 'description',
    header: 'Descripción'
  },
{
  accessorKey: 'status',
  header: 'Estado',
  cell: ({ row }: { row: any }) => {
    
    const rawStatus = row.getValue('status') as string
    
    const colors: Record<string, string> = {
      'PENDING': 'error',
      'IN_PROGRESS': 'neutral',
      'COMPLETED': 'success'
    }

    return h(UBadge, { 
      color: colors[rawStatus] || 'default', 
      variant: 'solid',
      class: 'font-bold'
    }, () => rawStatus)
  }
}
]

</script>

<template>
  <TabletComp 
    title="Listado de Proyectos"
    :data="projects"
    :columns="columns"
  >
    
    <template #filters>
      <div class="flex flex-col md:flex-row gap-4 md:items-end">

        <div class="flex flex-row "> 

      <label>Filtros:</label>
    
      <UInput 
      v-model="filters.search"
        icon="i-heroicons-magnifying-glass-20-solid" 
        placeholder="Buscar..." 
        class="w-64" 
      />
      
      <select v-model="filters.status"> 
        <option value="" disabled selected>Filtrar por estado</option>
        <option value="PENDING">Pendiente</option>
        <option value="IN_PROGRESS">En curso</option>
        <option value="COMPLETED">Completado</option>
      </select>


        </div>
      


      </div>

    </template>

  </TabletComp>
</template>


