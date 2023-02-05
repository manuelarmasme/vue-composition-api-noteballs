<template>
  <Navbar />

  <router-view />
</template>

<script setup>
/* imports */
import Navbar from '@/components/Layout/Navbar.vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { onMounted } from 'vue';

/* Store */

const storeNotes = useStoreNotes()

/* On mounted  hook*/

onMounted(()=>{
  storeNotes.getNote()
})

</script>

<style>
</style>
