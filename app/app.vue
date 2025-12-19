<script setup lang="ts">
const toaster = { max: 3 }
</script>


<template>
  <UApp :toaster="toaster">
<NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</UApp>
</template>
  