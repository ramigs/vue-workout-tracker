<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const appReady = ref(false)

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    appReady.value = true
  }
})

supabase.auth.onAuthStateChange((_, session) => {
  userStore.setUser(session)
  appReady.value = true
})
</script>

<template>
  <div v-if="appReady">
    <Navigation />
    <RouterView />
  </div>
</template>

<style scoped></style>
