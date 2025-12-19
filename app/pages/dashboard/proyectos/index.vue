
<script setup>
import { useFindManyProject , useUpdateProject} from '~~/lib/hooks'
definePageMeta({
  layout: 'dashboard-layout' // Debe coincidir con el nombre del archivo en la carpeta layouts
})

import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const {data:allProjects,isloading,error} = useFindManyProject()
const {mutate: updateProject} = useUpdateProject()
const pendientesList = ref([])
const enCursoList = ref([])
const completadosList = ref([])

watch(allProjects, () => {
  if (allProjects.value) {
    pendientesList.value = allProjects.value?.filter(p => p.status === 'PENDING') || []
    enCursoList.value = allProjects.value?.filter(p => p.status === 'IN_PROGRESS') || []
    completadosList.value = allProjects.value?.filter(p => p.status === 'COMPLETED') || []
  }
})

const onDrop = (event, newStatus) => {
  const item = event.data

  if (!item || !item.id) {
    console.error("❌ No se pudo leer la data del evento", event)
    return
  }

  updateProject({
      where: { id: item.id },
      data: { status: newStatus }
  }, {
      onSuccess: () => {
        alert('¡Guardado! El estado se actualizó correctamente.')
      },
      onError: (e) => {
        console.error('❌ Error al guardar en DB', e)
        alert('Error: No se pudo actualizar el estado.')
      }
  })
}

const isModalOpen = ref(false)

const handlerOpenModal = () => {
  isModalOpen.value = !isModalOpen.value
}

</script>


<template>
  <div class="grid grid-cols-3 grid-rows-[50px_1fr] gap-4 h-full w-full p-4">  
    <div class="bg-amber-400 text-white flex items-center justify-center font-bold ">PENDIENTES</div>
    <div class="bg-blue-400 text-white flex items-center justify-center font-bold ">EN CURSO</div>
    <div class="bg-emerald-400 text-white flex items-center justify-center font-bold">COMPLETADOS</div>

    <div class="bg-gray-100 rounded-b-lg border-x border-b border-gray-200 overflow-hidden">
      <VueDraggable
        v-model="pendientesList"
        group="kanban"
        animation="150"
        ghostClass="ghost"
        class="flex flex-col gap-3 p-4 h-full overflow-y-auto"
        @add="(event) => onDrop(event, 'PENDING')"
      >
   <ItemProject :listItems="pendientesList"/>
      </VueDraggable>
    </div>

    <div class="bg-gray-100 rounded-b-lg border-x border-b border-gray-200 overflow-hidden">
      <VueDraggable
        v-model="enCursoList"
        group="kanban"
        animation="150"
        ghostClass="ghost"
        class="flex flex-col gap-3 p-4 h-full overflow-y-auto"
        @add="(event) => onDrop(event, 'IN_PROGRESS')"
      >
    <ItemProject :listItems="enCursoList"/>
        </VueDraggable>
      </div>



    <div class="bg-gray-100 rounded-b-lg border-x border-b border-gray-200 overflow-hidden">
  <VueDraggable
    v-model="completadosList" 
    group="kanban"
    animation="150"
    ghostClass="ghost"
    class="flex flex-col gap-3 p-4 h-full min-h-full overflow-y-auto"
@add="(event) => onDrop(event, 'COMPLETED')"
  >
    <ItemProject :listItems="completadosList"/>
  </VueDraggable>
    
</div>


</div>

<div class="fixed bottom-8 right-8 z-50">
  <UButton 
    icon="i-lucide-plus" 
    size="xl"
    color="primary"
    class="shadow-xl w-14 h-14 flex items-center justify-center transition-transform hover:scale-110"
    @click="handlerOpenModal"
    />
</div>
<div v-if="isModalOpen" class="fixed inset-0 w-full h-full justify-center items-center flex  z-50">
  <modalComp v-if="isModalOpen" :toggleEvent="handlerOpenModal"/>
</div>

</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #cbd5e1; /* Color gris al arrastrar */
  border: 2px dashed #64748b;
}
</style>