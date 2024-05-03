<template>
  <div>
    <header class="bg-[#F9F9FB] py-2 px-6">
      <nav class="flex justify-between h-12 items-center">
        <div>
          <NuxtLink class="text-3xl font-bold" to="/">sma.</NuxtLink>
        </div>
        <ul class="flex gap-6 text-lg font-semibold">
          <li>
            <NuxtLink to="/">Timeline</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/connect">Connect with others</NuxtLink>
          </li>
        </ul>
        <div>
          <button
            class="bg-red-700 px-2 py-1 rounded-md w-full text-white"
            @click="handleLogout"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";

const { logout } = useAuth();
let userId = null;
if (process.client) {
  userId = localStorage.getItem("userId");
}
const handleLogout = async () => {
  try {
    if (userId) {
      await logout(userId);
    }
  } catch (err) {
    console.error(err);
  }
};
</script>

<style lang="scss" scoped></style>
