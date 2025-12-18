
<script lang="ts" setup>

interface itemProject {
  id: string;
  name:  string;
  status: string;
}

 const props = defineProps({
   listItems: {
     type: Array as () => itemProject[],
     required: true,
     default:  []
   }
})

const onsubmit = (item: itemProject) => {
  console.log('Item clickeado:', item);
}

</script>



<template>

<div
          v-for="item in props.listItems"
          :key="item.id"
          class=" grid grid-cols-2 border-[var(--color-venice-blue-800)] p-4 justify-center items-center cursor-move bg-white shadow-sm border border-gray-200 rounded p-4 hover:shadow-md transition-shadow"
        >


  <div>

  <p class="font-bold text-gray-700">{{ item.name }}</p>
  <span class="text-xs text-gray-400">ID: {{ item.id }}</span>
  </div>

   <div class="flex justify-center items-center">   <UButton 
    @click.stop="onsubmit(item)" 
    icon="i-lucide-eye"
    class="bg-blue-500  text-white px-2 py-1 rounded hover:bg-blue-600"
  >

  </UButton>

 </div>



  
</div>


</template>
