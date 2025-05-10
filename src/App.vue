<script setup>
import { RouterView } from 'vue-router';
import OperationsView from '@/Operations/Presentation/operations-view.page.vue';
</script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>