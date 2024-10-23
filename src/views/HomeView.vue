<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref, type Ref } from 'vue'
import type { CardioExercise, StrengthTrainingExercise } from './CreateView.vue'

export interface Workout {
  id: number
  created_at: Date
  updated_at: Date
  workoutName: string
  workoutType: string
  strengthTrainingExercises?: StrengthTrainingExercise[]
  cardioExercises?: CardioExercise[]
}

const data: Ref<Array<Workout> | null> = ref([])

const dataLoaded = ref(false)

const fetchData = async () => {
  const { data: workouts, error } = await supabase.from('workouts').select('*')
  data.value = workouts
  dataLoaded.value = true
}

fetchData()
</script>

<template>
  <div v-if="dataLoaded" class="workouts-container">
    <div v-if="data?.length === 0" class="no-data">
      <h1>Looks empty here...</h1>
      <router-link :to="{ name: 'create' }" class="create-workout-link"
        >Create Workout</router-link
      >
    </div>
    <div v-else></div>
  </div>
</template>

<style scoped>
.workouts-container {
  margin-top: 2.5rem;
  padding-inline: 0.375rem;
}

.no-data {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 1.5rem; /* 24px */
    line-height: 2rem;
  }
}

.create-workout-link {
  margin-inline: auto;
  margin-top: 1.5rem;
  padding-block: 0.5rem;
  padding-inline: 1.5rem;
  border-radius: 0.125rem;
  align-self: start;
  color: white;
  font-size: 0.875rem;
  line-height: 1.25rem;
  background-color: var(--at-light-green);
  transition-duration: 200ms;
  border: 2px solid transparent;
  cursor: pointer;
  text-decoration: none;
}

.create-workout-link:hover {
  border-color: var(--at-light-green);
  background-color: white;
  color: var(--at-light-green);
}
</style>
