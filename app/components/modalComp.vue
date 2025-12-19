<script lang="ts" setup>
import { ref } from 'vue'
import { useFindManyUser, useCreateProject } from '../../lib/hooks'
const { data: allUsers, isLoading } = useFindManyUser()
const { mutate: createProject, isPending } = useCreateProject()

const projectName = ref('')
const selectedUserId = ref<string | undefined>(undefined)
const { user } = useAuth()

const handleCreate = () => {
  if  (!projectName.value) return

  createProject({
    data: {
      name: projectName.value,
      owner: { connect: { id: user.value?.id } },
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

const props  = defineProps<{
  toggleEvent: () => void
}>()


</script>

<template>
  <UCard class="w-[400px] h-[300px] ">
    
    <template #header>
   
      <div class="w-full flex-row justify-between items-center flex">
     
        <h3 class="font-bold">Nuevo Proyecto</h3>
      <UButton 
        icon="i-heroicons-x-mark-20-solid" 
        class="hover:bg-blue-200 w-[30px] h-[30px] items-center justify-center p-0"
        @click="props.toggleEvent" />
    
      </div>

    </template>

    <div class="flex flex-col gap-4 w-full ">
      
      <UFormGroup label="Nombre del Proyecto">
        <UInput class="w-full" v-model="projectName" placeholder="Ej: Rediseño Web" />
      </UFormGroup>

      <UFormGroup label="Creador del Proyecto">

        <UInput class="w-full" disabled :model-value="user?.name" v></UInput>


      </UFormGroup>

      <UButton 
        block 
        :loading="isPending" 
        @click="handleCreate"
        :disabled="!projectName"
      >
        Crear Proyecto
      </UButton>
    </div>
  </UCard>
</template>