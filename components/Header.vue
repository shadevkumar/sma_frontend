<template>
  <div class="sticky top-0 z-50">
    <header class="bg-[#F9F9FB] h-[10vh] px-4 shadow-md">
      <nav class="flex justify-between h-full items-center">
        <div>
          <NuxtLink class="text-xl md:text-3xl font-bold" to="/">sma.</NuxtLink>
        </div>
        <ul class="flex gap-6 text-sm md:text-lg font-semibold">
          <li :class="{ 'border-b-2 border-black': isActive('/') }">
            <NuxtLink to="/">Timeline</NuxtLink>
          </li>
          <li :class="{ 'border-b-2 border-black': isActive('/connect') }">
            <NuxtLink to="/connect">Connections</NuxtLink>
          </li>
        </ul>
        <div>
          <button
            class="bg-red-700 px-1 md:px-2 py-1 text-sm md:text-base rounded-md w-full text-white flex items-center"
            @click="handleLogout"
          >
            <Icon name="material-symbols-light:logout-rounded" />
            Logout
          </button>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
const route = useRoute();

const { logout } = useAuth();
let userId = null;
if (process.client) {
  userId = localStorage.getItem("userId");
}
const handleLogout = async () => {
  try {
    await logout(userId);
  } catch (err) {
    console.error(err);
  }
};

const isActive = (path) => {
  return route.path === path;
};
</script>

<style lang="scss" scoped></style>
