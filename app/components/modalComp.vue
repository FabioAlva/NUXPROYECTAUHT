<script lang="ts" setup>
import { ref } from 'vue'
import { useFindManyUser, useCreateProject } from '../../lib/hooks'
const { data: allUsers, isLoading } = useFindManyUser()
const { mutate: createProject, isPending } = useCreateProject()

const projectName = ref('')
const selectedUserId = ref<string | undefined>(undefined)

const handleCreate = () => {
  if (!selectedUserId.value || !projectName.value) return

  createProject({
    data: {
      name: projectName.value,
      owner: { connect: { id: selectedUserId.value } }
    }
  }, {
    onSuccess: () => {
      alert('Proyecto creado exitosamente')
      projectName.value = ''
      selectedUserId.value = undefined
    },
    onError: (e) => console.error(e)
  })
}
</script>

<template>
  <UCard class="w-[400px] h-[400px] mt-10">
    <template #header>
      <h3 class="font-bold">Nuevo Proyecto</h3>
    </template>

    <div class="flex flex-col gap-4">
      
      <UFormGroup label="Nombre del Proyecto">
        <UInput v-model="projectName" placeholder="Ej: Rediseño Web" />
      </UFormGroup>

      <UFormGroup label="Asignar Dueño (Select Normal)">
        
        <select
          v-model="selectedUserId"
          :disabled="isLoading"
          class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        >
          <option :value="undefined" disabled>Selecciona un usuario...</option>
          
          <option 
            v-for="user in allUsers" 
            :key="user.id" 
            :value="user.id"
          >
            {{ user.name || user.email || user.id }}
          </option>
        </select>

      </UFormGroup>

      <UButton 
        block 
        :loading="isPending" 
        @click="handleCreate"
        :disabled="!projectName || !selectedUserId"
      >
        Crear Proyecto
      </UButton>
    </div>
  </UCard>
</template>