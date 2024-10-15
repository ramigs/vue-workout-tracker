<script setup lang="ts"></script>

<template>
  <header class="header">
    <nav class="container nav">
      <div class="container-logo">
        <img class="logo" src="@/assets/images/dumbbell-light.png" alt="" />
        <h1 class="text-lg">Active Tracker</h1>
      </div>
      <ul class="nav-items">
        <router-link class="nav-item" :to="{ name: 'home' }">Home</router-link>
        <router-link class="nav-item" :to="{ name: '' }">Create</router-link>
        <router-link class="nav-item" :to="{ name: 'login' }"
          >Login</router-link
        >
        <li class="nav-item">Logout</li>
      </ul>
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

.nav-items {
  display: flex;
  flex: 1 1 0%;
  justify-content: flex-end;
  column-gap: 2.5rem;
  list-style-type: none;
}

.nav-item {
  color: white;
  text-decoration: none;
  cursor: pointer;
}

@media not all and (max-width: 640px) {
  .nav {
    flex-direction: row;
  }
}
</style>
