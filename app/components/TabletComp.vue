<script setup lang="ts">
const props = defineProps<{
  title: string,
  data: Array<any>,
  columns: Array<any>
}>()
</script>

<template>
  <div class="flex flex-col h-full w-full p-4">
    <h2 class="text-2xl font-bold mb-4">{{ props.title }}</h2>

    <div class="flex mb-4 space-x-2 items-center">
      <slot name="filters"></slot>
    </div>

    <UTable :data="data" :columns="columns" class="flex-1" />
  </div>
</template>