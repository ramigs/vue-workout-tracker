<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

export type WorkoutType = 'cardio' | 'strength'

export interface StrengthTrainingExercise {
  id: string
  exerciseName: string
  sets: '' | number
  reps: '' | number
  weight: '' | number
}

type CardioExerciseType = 'walk' | 'run'

export interface CardioExercise {
  id: string
  cardioExerciseType: 'select-cardio-exercise-type' | CardioExerciseType
  distance: '' | number
  duration: '' | number
}

interface WorkoutForm {
  workoutName: string
  workoutType: 'select-workout-type' | WorkoutType
  strengthTrainingExercises?: Array<StrengthTrainingExercise>
  cardioExercises?: Array<CardioExercise>
}

const workoutForm: WorkoutForm = reactive({
  workoutName: '',
  workoutType: 'select-workout-type',
  strengthTrainingExercises: [
    {
      id: self.crypto.randomUUID(),
      exerciseName: '',
      sets: '',
      reps: '',
      weight: '',
    },
  ],
  cardioExercises: [
    {
      id: self.crypto.randomUUID(),
      cardioExerciseType: 'select-cardio-exercise-type',
      distance: '',
      duration: '',
    },
  ],
})

const errorMsg: Ref<string | null> = ref(null)

const statusMsg: Ref<string | null> = ref(null)

const addExercise = () => {
  if (workoutForm.workoutType === 'strength') {
    workoutForm.strengthTrainingExercises?.push({
      id: self.crypto.randomUUID(),
      exerciseName: '',
      sets: '',
      reps: '',
      weight: '',
    })
    return
  }
  if (workoutForm.workoutType === 'cardio') {
    workoutForm.cardioExercises?.push({
      id: self.crypto.randomUUID(),
      cardioExerciseType: 'select-cardio-exercise-type',
      distance: '',
      duration: '',
    })
  }
}

const deleteExercise = (index: number) => {
  if (workoutForm.workoutType === 'strength') {
    if (
      workoutForm.strengthTrainingExercises &&
      workoutForm.strengthTrainingExercises.length > 1
    ) {
      workoutForm.strengthTrainingExercises?.splice(index, 1)
      return
    } else {
      errorMsg.value =
        'Error: cannot remove, need to have at least one exercise'
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
      return
    }
  }
  if (workoutForm.workoutType === 'cardio') {
    if (
      workoutForm.strengthTrainingExercises &&
      workoutForm.strengthTrainingExercises.length > 1
    ) {
      workoutForm.cardioExercises?.splice(index, 1)
      return
    } else {
      errorMsg.value =
        'Error: cannot remove, need to have at least one exercise'
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
      return
    }
  }
}

const saveWorkout = async () => {
  try {
    const { error } = await supabase.from('workouts').insert([
      {
        workoutName: workoutForm.workoutName,
        workoutType: workoutForm.workoutType,
        exercises:
          workoutForm.workoutType === 'strength'
            ? workoutForm.strengthTrainingExercises
            : workoutForm.cardioExercises,
      },
    ])
    if (error) throw error
    statusMsg.value = 'Success: workout saved!'
    workoutForm.workoutName = ''
    workoutForm.workoutType = 'select-workout-type'
    workoutForm.strengthTrainingExercises = [
      {
        id: self.crypto.randomUUID(),
        exerciseName: '',
        sets: '',
        reps: '',
        weight: '',
      },
    ]
    workoutForm.cardioExercises = [
      {
        id: self.crypto.randomUUID(),
        cardioExerciseType: 'select-cardio-exercise-type',
        distance: '',
        duration: '',
      },
    ]
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
</script>

<template>
  <div class="create-workout">
    <div v-if="statusMsg || errorMsg" class="error">
      <p class="error-msg">{{ errorMsg }}</p>
      <p class="status-msg">{{ statusMsg }}</p>
    </div>
    <form @submit.prevent="saveWorkout" class="create-form">
      <h1>Record Workout</h1>
      <div class="form-group">
        <label for="workout-name">Workout Name</label>
        <input
          id="workout-name"
          type="text"
          class="form-input"
          required
          v-model="workoutForm.workoutName"
        />
      </div>
      <div class="form-group">
        <label for="workout-type">Workout Type</label>
        <select
          id="workout-type"
          class="form-input"
          required
          v-model="workoutForm.workoutType"
        >
          <option value="select-workout-type" selected disabled>
            Select Type
          </option>
          <option value="cardio">Cardio</option>
          <option value="strength">Strength Training</option>
        </select>
      </div>
      <!-- Strength training inputs -->
      <div
        v-if="workoutForm.workoutType === 'strength'"
        style="display: flex; flex-direction: column; row-gap: 1rem"
      >
        <div
          v-for="(item, index) in workoutForm.strengthTrainingExercises"
          :key="item.id"
          class="exercise"
        >
          <div style="display: flex; flex-direction: column">
            <label for="exercise-name">Exercise</label>
            <input
              id="exercise-name"
              required
              type="text"
              class="form-input"
              v-model="item.exerciseName"
            />
          </div>
          <div style="display: flex; flex-direction: column; width: 120px">
            <label for="sets">Sets</label>
            <input
              id="sets"
              required
              type="number"
              class="form-input"
              v-model="item.sets"
            />
          </div>
          <div style="display: flex; flex-direction: column; width: 120px">
            <label for="reps">Reps</label>
            <input
              id="reps"
              required
              type="number"
              class="form-input"
              v-model="item.reps"
            />
          </div>
          <div style="display: flex; flex-direction: column; width: 120px">
            <label for="weight">Weight (Kg)</label>
            <input
              id="weight"
              required
              type="number"
              class="form-input"
              v-model="item.weight"
            />
          </div>
          <img
            src="@/assets/images/trash-light-green.png"
            alt=""
            style="
              height: 1rem;
              width: auto;
              position: absolute;
              left: -1.25rem;
              cursor: pointer;
            "
            @click="deleteExercise(index)"
          />
        </div>
        <button type="button" class="btn" @click="addExercise">
          Add Exercise
        </button>
      </div>
      <!-- Cardio inputs -->
      <div
        v-if="workoutForm.workoutType === 'cardio'"
        style="display: flex; flex-direction: column; row-gap: 1rem"
      >
        <div
          v-for="(item, index) in workoutForm.cardioExercises"
          :key="item.id"
          class="exercise"
        >
          <div style="display: flex; flex-direction: column">
            <label for="cardio-type">Type</label>
            <select
              id="cardio-type"
              class="form-input"
              v-model="item.cardioExerciseType"
            >
              <option value="select-cardio-exercise-type" selected disabled>
                Select Type
              </option>
              <option value="run">Run</option>
              <option value="walk">Walk</option>
            </select>
          </div>
          <div style="display: flex; flex-direction: column; width: 120px">
            <label for="distance">Distance (Kms)</label>
            <input
              id="distance"
              required
              type="number"
              class="form-input"
              v-model="item.distance"
            />
          </div>
          <div style="display: flex; flex-direction: column; width: 120px">
            <label for="duration">Duration (Mins)</label>
            <input
              id="duration"
              required
              type="number"
              class="form-input"
              v-model="item.duration"
            />
          </div>
          <img
            src="@/assets/images/trash-light-green.png"
            alt=""
            style="
              height: 1rem;
              width: auto;
              position: absolute;
              left: -1.25rem;
              cursor: pointer;
            "
            @click="deleteExercise(index)"
          />
        </div>
        <button type="button" class="btn" @click="addExercise">
          Add Exercise
        </button>
      </div>
      <button type="submit" class="btn" style="margin-top: 2.75rem">
        Record Workout
      </button>
    </form>
  </div>
</template>

<style scoped>
.create-workout {
  max-width: 768px;
  margin-inline: auto;
  padding-inline: 1rem;
  padding-block: 2.5rem;
}

.error {
  margin-bottom: 2.5rem;
  padding: 1rem;
  border-radius: 0.375rem;
  background-color: var(--light-grey);
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.error-msg {
  color: rgb(239 68 68);
}

.status-msg {
  color: var(--at-light-green);
}

.create-form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background-color: var(--light-grey);
  border-radius: 0.375rem;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
}

h1 {
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: var(--at-light-green);
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

label {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
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

.exercise {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  column-gap: 1.5rem;
  row-gap: 0.5rem;
}

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
</style>
