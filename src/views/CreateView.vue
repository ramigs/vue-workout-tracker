<script setup lang="ts">
import { reactive, ref, type Reactive, type Ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'vue-router'

type WorkoutType = 'cardio' | 'strength'

interface WorkoutForm {
  workoutName: string
  workoutType: 'select-workout' | WorkoutType
  exercises: Array<string>
}

const workoutForm: WorkoutForm = reactive({
  workoutName: '',
  workoutType: 'select-workout',
  exercises: [],
})

const errorMsg: Ref<string | null> = ref(null)

const statusMsg: Ref<string | null> = ref(null)

const router = useRouter()
</script>

<template>
  <div class="create-workout">
    <div v-if="statusMsg || errorMsg" class="error">
      <p class="error-msg">{{ errorMsg }}</p>
      <p class="status-msg">{{ statusMsg }}</p>
    </div>
    <form class="create-form">
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
          <option value="select-workout">Select Workout</option>
          <option value="cardio">Cardio</option>
          <option value="strength">Strength Training</option>
        </select>
      </div>
      <div
        v-if="workoutForm.workoutType === 'strength'"
        class="form-group"
      ></div>
      <button type="submit" class="btn-register">Login</button>
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

.btn-register {
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
}

.btn-register:hover {
  border-color: var(--at-light-green);
  background-color: white;
  color: var(--at-light-green);
}

.login-link {
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 1.5rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
}
</style>
