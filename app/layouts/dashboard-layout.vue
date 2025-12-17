<script setup lang="ts">
import type HeaderVue from '~/components/Header.vue';
import type SiderMenuVue from '~/components/SiderMenu.vue';

</script>
<template>

<div class="flex h-screen flex-col bg-gray-200">
    <Header></Header>  
    <div class="flex flex-row w-full h-screen">
    <SiderMenu></SiderMenu>
    <div class="w-full h-full p-5">
            <slot> </slot>    
    </div>
</div>
</div>
    </template>