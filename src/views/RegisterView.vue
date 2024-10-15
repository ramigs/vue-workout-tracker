<script setup lang="ts">
import { reactive, ref, type Reactive, type Ref } from 'vue'

/* const email: Ref<string | null> = ref(null)
const password: Ref<string | null> = ref(null)
const confirmPassword: Ref<string | null> = ref(null) */

interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
}

const registerForm: RegisterForm = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})

const errorMsg: Ref<string | null> = ref(null)
</script>

<template>
  <div class="register">
    <div v-if="errorMsg" class="error">
      <p class="error-msg">{{ errorMsg }}</p>
    </div>
    <form class="register-form">
      <h1>Register</h1>
      <div>
        <label for="email">Email</label>
      </div>
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
  font-size: 1.875rem; /* 30px */
  line-height: 2.25rem; /* 36px */
  color: var(--at-light-green);
  margin-bottom: 1rem;
}
</style>
