<script setup lang="ts">
    const OpenSidebar = ref(true);
    const toggleSidebar = () => {
        OpenSidebar.value = !OpenSidebar.value;
    }
</script>
<template>

<div class="flex h-screen flex-col bg-gray-200">
    <Header :toggleSidebar="toggleSidebar"></Header>  
    <div class="flex flex-row w-full h-screen">
    <SiderMenu :opened="OpenSidebar"></SiderMenu>
    <div class="w-full h-full p-5">
            <slot> </slot>    
    </div>
</div>
</div>
    </template>