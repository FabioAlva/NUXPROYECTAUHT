
<script setup>

definePageMeta({
  layout: 'dashboard-layout' // Debe coincidir con el nombre del archivo en la carpeta layouts
})

import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
const list1 = ref([
  {
    name: 'Joao',
    id: '1',
    apellido : 'Perez'

  },
  {
    name: 'Jean',
    id: '2'
  },
  {
    name: 'Johanna',
    id: '3'
  },
  {
    name: 'Juan',
    id: '4'
  }
])


const list2 = ref(
  list1.value.map(item => ({
    name: `${item.name}-2`,
    id: `${item.id}-2`
  }))
)


function onUpdate() {
  console.log('update')
}


function onAdd() {
  console.log('add')
}


function remove() {
  console.log('remove')
}


const list3 = ref([]) // Lista vacía para la tercera columna

</script>


<template>
  <div class="grid grid-cols-3 grid-rows-[50px_1fr] gap-4 h-full w-full p-4">
    
    <div class="bg-amber-400 text-white flex items-center justify-center font-bold rounded-t-lg">PENDIENTES</div>
    <div class="bg-blue-400 text-white flex items-center justify-center font-bold rounded-t-lg">EN CURSO</div>
    <div class="bg-emerald-400 text-white flex items-center justify-center font-bold rounded-t-lg">COMPLETADOS</div>

    <div class="bg-gray-100 rounded-b-lg border-x border-b border-gray-200 overflow-hidden">
      <VueDraggable
        v-model="list1"
        group="kanban"
        animation="150"
        ghostClass="ghost"
        class="flex flex-col gap-3 p-4 h-full overflow-y-auto"
      >
        <div
          v-for="item in list1"
          :key="item.id"
          class="cursor-move bg-white shadow-sm border border-gray-200 rounded p-4 hover:shadow-md transition-shadow"
        >
          <p class="font-bold text-gray-700">{{ item.name }} {{ item.apellido }}</p>
          <span class="text-xs text-gray-400">ID: {{ item.id }}</span>
        </div>
      </VueDraggable>
    </div>

    <div class="bg-gray-100 rounded-b-lg border-x border-b border-gray-200 overflow-hidden">
      <VueDraggable
        v-model="list2"
        group="kanban"
        animation="150"
        ghostClass="ghost"
        class="flex flex-col gap-3 p-4 h-full overflow-y-auto"
      >
        <div
          v-for="item in list2"
          :key="item.id"
          class="cursor-move bg-white shadow-sm border border-gray-200 rounded p-4 hover:shadow-md transition-shadow"
        >
          <p class="font-bold text-gray-700">{{ item.name }}</p>
        </div>
      </VueDraggable>
    </div>

    <div class="bg-gray-100 rounded-b-lg border-x border-b border-gray-200 overflow-hidden">
  <VueDraggable
    v-model="list3" 
    group="kanban"
    animation="150"
    ghostClass="ghost"
    class="flex flex-col gap-3 p-4 h-full min-h-full overflow-y-auto"
  >
    <div
      v-for="item in list3"
      :key="item.id"
      class="cursor-move bg-white shadow-sm border border-gray-200 rounded p-4 hover:shadow-md transition-shadow"
    >
      <p class="font-bold text-gray-700">{{ item.name }}</p>
    </div>
  </VueDraggable>
</div>


  </div>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #cbd5e1; /* Color gris al arrastrar */
  border: 2px dashed #64748b;
}
</style>