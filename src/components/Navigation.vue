<script setup lang="ts"></script>

<template>
  <header class="header">
    <nav class="container nav">
      <div class="container-logo">
        <img class="logo" src="@/assets/images/dumbbell-light.png" alt="" />
        <h1 class="text-lg">Active Tracker</h1>
      </div>
      <ul></ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--at-light-green);
  color: white;
}

.nav {
  padding-block: 1.25rem;
  padding-inline: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin: auto;
}

.container-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  width: 3.5rem;
}

h1 {
  font-size: 1.125rem;
}

@media not all and (max-width: 640px) {
  .nav {
    flex-direction: row;
  }
}
</style>
