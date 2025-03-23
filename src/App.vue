<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import TasksPage from './pages/TasksPage.vue';

</script>

<template>

  <Navbar />

  <router-view v-slot="{ Component }">
    <transition  name="fade"  mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <Footer />

</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
