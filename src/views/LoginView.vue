<script setup lang="ts">
import { reactive, ref, type Reactive, type Ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'vue-router'

interface LoginForm {
  email: string
  password: string
}

const loginForm: LoginForm = reactive({
  email: '',
  password: '',
})

const errorMsg: Ref<string | null> = ref(null)

const router = useRouter()

const login = async () => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    })
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
</script>

<template>
  <div class="register">
    <div v-if="errorMsg" class="error">
      <p class="error-msg">{{ errorMsg }}</p>
    </div>
    <form @submit.prevent="login" class="register-form">
      <h1>Login</h1>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="text"
          class="form-input"
          required
          v-model="loginForm.email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          class="form-input"
          required
          v-model="loginForm.password"
        />
      </div>
      <button type="submit" class="btn-register">Login</button>
      <RouterLink :to="{ name: 'register' }" class="login-link"
        >Don't have an account?
        <span style="color: var(--at-light-green)">Register</span></RouterLink
      >
    </form>
  </div>
</template>

<style scoped>
.register {
  max-width: 640px;
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

.register-form {
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
