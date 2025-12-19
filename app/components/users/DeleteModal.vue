<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number;
  }>(),
  {
    count: 0,
  }
);

const open = ref(false);

async function onSubmit() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  open.value = false;
}
</script>

<template>
  <UModal
    v-model:open="open"
    :title="`Eliminar ${count} usuario${count > 1 ? 's' : ''}`"
    :description="`¿Estas seguro que deseas eliminar ${count} usuario${
      count > 1 ? 's' : ''
    }?`"
    :close="{
      color: 'error',
      variant: 'outline',
      class: 'rounded-full',
    }"
  >
    <slot />

    <template #body>
      <div class="flex justify-end gap-2">
        <UButton
          label="Cancelar"
          color="neutral"
          variant="solid"
          @click="open = false"
        />
        <UButton
          label="Eliminar"
          color="error"
          variant="solid"
          loading-auto
          @click="onSubmit"
        />
      </div>
    </template>
  </UModal>
</template>
