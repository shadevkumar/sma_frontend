<!-- components/LoginForm.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen bg-[#161616]">
    <form
      @submit.prevent="handleSubmit"
      class="border p-6 gap-2 bg-[#ffffff] max-sm:w-[85%] w-[60%] lg:w-[35%] 2xl:w-[20%] rounded-md"
    >
      <h1 class="text-2xl font-bold mb-4">Login</h1>

      <div class="flex flex-col gap-2">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          required
          class="border-2 h-10 p-2"
        />
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="border-2 h-10 p-2"
        />
      </div>
      <div class="flex flex-col items-center my-3">
        <button
          type="submit"
          class="bg-blue-700 px-2 py-1 rounded-md w-full text-white"
        >
          Sign in
        </button>
      </div>
      <NuxtLink to="/signup" class="text-center">
        Don't have an account? Sign Up
      </NuxtLink>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { navigateTo } from "nuxt/app";

const { login } = useAuth();
const username = ref("");
const password = ref("");
const errorMessage = ref("");

const handleSubmit = async () => {
  try {
    await login({ username: username.value, password: password.value });
    navigateTo("/");
  } catch (err) {
    errorMessage.value = err.message;
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
