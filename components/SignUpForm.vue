<template>
  <div class="flex items-center justify-center min-h-screen bg-[#161616]">
    <form
      @submit.prevent="handleSubmit"
      class="border p-6 gap-2 bg-[#ffffff] max-sm:w-[85%] w-[60%] lg:w-[35%] 2xl:w-[20%] rounded-md"
    >
      <h1 class="text-2xl font-bold mb-4">Sign Up</h1>

      <div class="flex flex-col gap-2">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          required
          class="border-2 h-10 p-2"
        />
        <p v-if="successMessage" class="success">
          {{ successMessage }}
        </p>
        <p v-else-if="errorMessage" class="error">
          {{ errorMessage }}
        </p>
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
          Sign Up
        </button>
      </div>
      <NuxtLink to="/login" class="text-center">
        Already have an account? Login
      </NuxtLink>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const { signup } = useAuth();

const handleSubmit = async () => {
  errorMessage.value = ""; // Reset the error message before attempting to sign up

  try {
    const response = await signup({
      username: username.value,
      password: password.value,
    });
    successMessage.value = "Signup successful! Redirecting..."; // Set success message
    setTimeout(() => navigateTo("/login"), 2000); // Redirect after showing success message
  } catch (err) {
    console.error(err);
    errorMessage.value = err.message; // Display any error messages to the user
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.success {
  color: green; /* Style for success message */
}
</style>
