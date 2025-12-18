<script lang="ts" setup>

import { useFindManyUser } from '../../lib/hooks'

const { data: allUsers } = useFindManyUser()

</script>



<template>
  <UCard>
    <p v-for="user in allUsers" :key="user.id">{{ user.name }}</p>
  
  </UCard>
</template>

