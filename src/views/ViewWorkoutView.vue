<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useRoute, useRouter } from 'vue-router'
import type { Workout } from './HomeView.vue'
import { useUserStore } from '@/stores/user'

const workout: Ref<Workout | null> = ref(null)
const dataLoaded = ref(false)
const errorMsg: Ref<string | null> = ref(null)
const statusMsg: Ref<string | null> = ref(null)
const route = useRoute()
const router = useRouter()
const workoutId = route.params.workoutId
const userStore = useUserStore()
const user = userStore.user
const editMode = ref(false)

const fetchData = async () => {
  try {
    const { data: workouts, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('id', workoutId)
    if (error) throw error
    workout.value = workouts[0]
    dataLoaded.value = true
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMsg.value = error.message
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
    } else {
      errorMsg.value = 'Oops! Something went wrong...'
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
    }
  }
}

const toggleEditMode = () => {
  editMode.value = !editMode.value
}

const deleteWorkout = async () => {
  try {
    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', workoutId)
    if (error) throw error
    router.push({ name: 'home' })
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMsg.value = error.message
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
    } else {
      errorMsg.value = 'Oops! Something went wrong...'
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
    }
  }
}

const updateWorkout = async () => {
  try {
    dataLoaded.value = false
    const { error } = await supabase
      .from('workouts')
      .update({
        workoutName: workout.value?.workoutName,
        exercises: workout.value?.exercises,
      })
      .eq('id', workoutId)
    if (error) throw error
    editMode.value = false
    fetchData()
    dataLoaded.value = true
    statusMsg.value = 'Success: Workout Updated!'
    setTimeout(() => {
      statusMsg.value = null
    }, 5000)
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMsg.value = error.message
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
    } else {
      errorMsg.value = 'Oops! Something went wrong...'
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
    }
  }
}

const addExercise = () => {
  if (workout.value?.workoutType === 'strength') {
    workout.value.exercises.push({
      id: self.crypto.randomUUID(),
      exerciseName: '',
      sets: '',
      reps: '',
      weight: '',
    })
    return
  }
  if (workout.value?.workoutType === 'cardio') {
    workout.value.exercises.push({
      id: self.crypto.randomUUID(),
      cardioExerciseType: 'select-cardio-exercise-type',
      distance: '',
      duration: '',
    })
  }
}

const deleteExercise = (index: number) => {
  if (workout.value?.exercises && workout.value.exercises.length > 1) {
    workout.value.exercises?.splice(index, 1)
    return
  } else {
    errorMsg.value = 'Error: cannot remove, need to have at least one exercise'
    setTimeout(() => {
      errorMsg.value = null
    }, 5000)
    return
  }
}

fetchData()
</script>

<template>
  <div class="view">
    <div v-if="statusMsg || errorMsg" class="error-status">
      <p class="status">{{ statusMsg }}</p>
      <p class="error">{{ errorMsg }}</p>
    </div>
    <div v-if="dataLoaded && workout">
      <div class="general-workout-info">
        <div v-if="user" class="edit-delete-icons">
          <button class="edit-delete-button" @click="toggleEditMode">
            <img
              src="@/assets/images/pencil-light.png"
              class="edit-delete-img"
              alt=""
            />
          </button>
          <button @click="deleteWorkout" class="edit-delete-button">
            <img
              src="@/assets/images/trash-light.png"
              class="edit-delete-img"
              alt=""
            />
          </button>
        </div>
        <img
          v-if="workout.workoutType === 'cardio'"
          class="workout-type-img"
          src="@/assets/images/running-light-green.png"
          alt=""
        />
        <img
          v-if="workout.workoutType === 'strength'"
          class="workout-type-img"
          src="@/assets/images/dumbbell-light-green.png"
          alt=""
        />
        <span class="workout-type">
          {{ workout.workoutType }}
        </span>
        <div class="workout-name">
          <input
            v-if="editMode"
            type="text"
            class="workout-name-input"
            v-model="workout.workoutName"
          />
          <h1 v-else class="workout-name-title">
            {{ workout.workoutName }}
          </h1>
        </div>
      </div>
      <div class="exercises">
        <div
          v-if="workout.workoutType === 'strength'"
          class="exercises-strength"
        >
          <div
            class="exercise"
            v-for="(exercise, index) in workout.exercises"
            :key="exercise.id"
          >
            <div class="exercise-name">
              <label for="exercise-name" class="exercise-label">Exercise</label>
              <input
                id="exercise-name"
                v-if="editMode"
                type="text"
                class="exercise-input"
                v-model="exercise.exerciseName"
              />
              <p v-else>{{ exercise.exerciseName }}</p>
            </div>
            <div class="sets">
              <label for="sets" class="exercise-label">Sets</label>
              <input
                id="sets"
                v-if="editMode"
                type="text"
                class="exercise-input"
                v-model="exercise.sets"
              />
              <p v-else>{{ exercise.sets }}</p>
            </div>
            <div class="sets">
              <label for="reps" class="exercise-label">Reps</label>
              <input
                id="reps"
                v-if="editMode"
                type="text"
                class="exercise-input"
                v-model="exercise.reps"
              />
              <p v-else>{{ exercise.reps }}</p>
            </div>
            <div class="sets">
              <label for="weight" class="exercise-label">Weight (Kg)</label>
              <input
                id="weight"
                v-if="editMode"
                type="text"
                class="exercise-input"
                v-model="exercise.weight"
              />
              <p v-else>{{ exercise.weight }}</p>
            </div>
            <img
              v-if="editMode"
              @click="deleteExercise(index)"
              src="@/assets/images/trash-light-green.png"
              alt=""
              style="
                height: 1rem;
                width: auto;
                position: absolute;
                left: -1.25rem;
                cursor: pointer;
              "
            />
          </div>
          <button
            v-if="editMode"
            @click="addExercise"
            type="button"
            class="btn"
          >
            Add Exercise
          </button>
        </div>
        <div v-if="workout.workoutType === 'cardio'" class="exercises-strength">
          <div
            class="exercise"
            v-for="(exercise, index) in workout.exercises"
            :key="exercise.id"
          >
            <div class="exercise-name">
              <label for="cardio-type" class="exercise-label">Type</label>
              <select
                v-if="editMode"
                id="cardio-type"
                class="form-input"
                v-model="exercise.cardioExerciseType"
              >
                <option value="select-cardio-exercise-type" selected disabled>
                  Select Type
                </option>
                <option value="run">Run</option>
                <option value="walk">Walk</option>
              </select>
              <p v-else>{{ exercise.cardioExerciseType }}</p>
            </div>
            <div class="sets">
              <label for="distance" class="exercise-label">Distance</label>
              <input
                id="distance"
                v-if="editMode"
                type="text"
                class="exercise-input"
                v-model="exercise.distance"
              />
              <p v-else>{{ exercise.distance }}</p>
            </div>
            <div class="sets">
              <label for="duration" class="exercise-label"
                >Duration (Mins)</label
              >
              <input
                id="duration"
                v-if="editMode"
                type="text"
                class="exercise-input"
                v-model="exercise.duration"
              />
              <p v-else>{{ exercise.duration }}</p>
            </div>
            <img
              v-if="editMode"
              @click="deleteExercise(index)"
              src="@/assets/images/trash-light-green.png"
              alt=""
              style="
                height: 1rem;
                width: auto;
                position: absolute;
                left: -1.25rem;
                cursor: pointer;
              "
            />
          </div>
          <button
            v-if="editMode"
            @click="addExercise"
            type="button"
            class="btn"
          >
            Add Exercise
          </button>
        </div>
      </div>
      <button
        v-if="editMode"
        @click="updateWorkout"
        type="button"
        class="btn"
        style="margin-top: 2.5rem"
      >
        Update Workout
      </button>
    </div>
  </div>
</template>

<style scoped>
.btn {
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
}

.btn:hover {
  border-color: var(--at-light-green);
  background-color: white;
  color: var(--at-light-green);
}

.form-input {
  padding: 0.5rem;
  color: rgb(107 114 128);
  border: transparent;
}

.form-input:focus {
  outline: none;
  border: none;
}

.view {
  max-width: 640px;
  margin-inline: auto;
  padding-inline: 1rem;
  padding-block: 2.5rem;
}

.error-status {
  margin-bottom: 2.5rem;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  background-color: var(--light-grey);
}

.error {
  color: rgb(239 68 68);
}

.status {
  color: var(--at-light-green);
}

.general-workout-info {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 0.375rem;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  background-color: var(--light-grey);
}

.edit-delete-icons {
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  display: flex;
  column-gap: 0.5rem;
}

.edit-delete-button {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: var(--at-light-green);
  border: transparent;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.edit-delete-img {
  height: 0.875rem;
  width: auto;
}

.workout-type-img {
  height: 6rem;
  width: auto;
}

.workout-type {
  margin-top: 1.5rem;
  padding-block: 0.375rem;
  padding-inline: 1.25rem;
  color: white;
  font-size: 0.75rem;
  line-height: 1rem;
  background-color: var(--at-light-green);
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.workout-name {
  margin-top: 1.5rem;
  width: 100%;
}

.workout-name-input {
  padding: 0.5rem;
  width: 100%;
  color: rgb(107 114 128);
}

.workout-name-input:focus {
  outline: none;
}

.workout-name-title {
  color: var(--at-light-green);
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
}

.exercises {
  margin-top: 2.5rem;
  padding: 2rem;
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--light-grey);
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.exercises-strength {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
}

.exercise {
  display: flex;
  column-gap: 1.5rem;
  row-gap: 0.5rem;
  position: relative;
}

@media (max-width: 640px) {
  .exercise {
    flex-direction: column;
  }
}

.exercise-label {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--at-light-green);
}

.exercise-input {
  padding: 0.5rem;
  width: 100%;
  color: rgb(107 114 128);
}

.exercise-input:focus {
  outline: none;
}

.exercise-name {
  display: flex;
  flex: 2 2 0%;
  flex-direction: column;
}

@media (min-width: 768px) {
  .exercise-name {
    width: 33.333333%;
  }
}

.sets {
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
}
</style>
