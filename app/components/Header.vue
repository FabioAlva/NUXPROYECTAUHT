<script setup lang="ts">

const props = defineProps<{
  title?: string
  toggleSidebar: () => void
}>()



</script>

<template>
  <div  class="grid grid-cols-[250px_1fr_250px] h-[60px] bg-[var(--color-venice-blue-800)] px-4 items-center shadow-xl z-20 border-none">

    <div class=" col-start-1 col-end-1    w-full h-full flex justify-center items-center gap-1">
         <Logo />
      <UButton  @click="props.toggleSidebar"   icon="i-heroicons-bars-3" class="bg-transparent w-[40px] h-[40px] items-center justify-center"/>
      </div>
    <div class="col-start-2 col-end-2   "> </div>

    <div class="col-start-3 col-end-3">
    <UButton                icon="i-lucide-log-out" label="Cerrar sessión" :ui="{ base: 'bg-transparent hover:bg-blue-200' }"/>
    </div>
  
  
  </div>


  

</template>
