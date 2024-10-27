<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref, type Ref } from 'vue'
import type { CardioExercise, StrengthTrainingExercise } from './CreateView.vue'

type WorkoutBase = {
  id: number
  created_at: Date
  updated_at: Date
  workoutName: string
}

export type Workout = WorkoutBase &
  (
    | { workoutType: 'strength'; exercises: StrengthTrainingExercise[] }
    | { workoutType: 'cardio'; exercises: CardioExercise[] }
  )

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
  <div v-if="dataLoaded" class="workouts-container container">
    <div v-if="data?.length === 0" class="no-data">
      <h1>Looks empty here...</h1>
      <router-link :to="{ name: 'create' }" class="create-workout-link"
        >Create Workout</router-link
      >
    </div>
    <div v-else class="workouts-grid">
      <router-link
        v-for="workout in data"
        :to="{ name: 'view-workout', params: { workoutId: workout.id } }"
        class="workout-card"
      >
        <img
          v-if="workout.workoutType === 'cardio'"
          src="@/assets/images/running-light-green.png"
          style="height: 6rem; width: auto"
          alt=""
        />
        <img
          v-else
          src="@/assets/images/dumbbell-light-green.png"
          style="height: 6rem; width: auto"
          alt=""
        />
        <p class="workout-type-badge">
          {{ workout.workoutType }}
        </p>
        <h1 class="workout-name">{{ workout.workoutName }}</h1>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.workouts-container {
  margin: auto;
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

.workouts-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .workouts-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 768px) {
  .workouts-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .workouts-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.workout-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: var(--light-grey);
  text-decoration: none;
}

.workout-type-badge {
  margin-top: 1.5rem;
  padding-block: 0.25rem;
  padding-inline: 0.75rem;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(255 255 255);
  background-color: var(--at-light-green);
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem;
}

.workout-name {
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: var(--at-light-green);
  font-size: 1.25rem;
  line-height: 1.75rem;
}
</style>
