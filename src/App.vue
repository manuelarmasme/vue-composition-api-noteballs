<template>
  <Navbar />

  <router-view />
</template>

<script setup>
/* imports */
import Navbar from '@/components/Layout/Navbar.vue';
import { useStoreAuth } from '@/stores/storeAuth';
import { onMounted } from 'vue';

/* Store */

const storeAuth = useStoreAuth()

/* On mounted  hook*/

onMounted(()=>{
  storeAuth.init()
})

</script>

<style>
</style>
