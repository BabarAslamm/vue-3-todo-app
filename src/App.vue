<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import TasksPage from './pages/TasksPage.vue';

</script>

<template>

  <Navbar />

  <router-view />

  <Footer />

</template>

<style scoped>

</style>
