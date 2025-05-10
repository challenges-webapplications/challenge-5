<script setup>


</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <h1 class="app-title">Operations Create and Delete</h1>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: darkcyan;
  padding: 1rem;
  width: 100%;
}

.header-content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.app-title {
  text-align: left;
  margin: 0;
  flex-shrink: 0;
}

.search-bar-container {
  flex: 1;
  max-width: 400px;
  margin: 0 20px;
}

.language-switcher-container {
  position: static;
  flex-shrink: 0;
}
</style>