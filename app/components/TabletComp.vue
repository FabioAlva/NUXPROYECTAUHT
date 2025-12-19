<script setup lang="ts">
const props = defineProps<{
  title: string,
  data: Array<any>,
  columns: Array<any>
}>()
</script>

<template>
  <div class="flex flex-col h-full w-full p-4">
    <h2 class="text-2xl font-bold mb-4 text-[var(--color-venice-blue-800))]">{{ props.title }}</h2>

    <div class="flex mb-4 space-x-2 items-center">
      <slot name="filters"></slot>
    </div>

    <UTable :data="data" :columns="columns" class="shrink-0 flex-1 max-h-[calc(100vh-19rem)] table-auto text-white"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        th: 'py-1 first:rounded-tl-lg last:rounded-tr-lg border-y first:border-l last:border-r bg-[var(--color-venice-blue-800)] text-[#cfd6dd] text-center border border-[#d1d5db] text-[0.88rem] font-semibold',
        td: 'py-1 bg-[#FFFFFF] border text-black border-[var(--color-venice-blue-800)] text-[0.9rem] text-center',
      }"
    />
  </div>
</template>