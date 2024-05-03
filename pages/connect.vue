<template>
  <div class="flex justify-center">
    <ConnectUsers :users="connectUsers" />
    <UserRequest />
  </div>
</template>

<script setup lang="ts">
const { $useAuthCookies } = useNuxtApp();
const { accessToken } = $useAuthCookies();
const { checkAndRefreshToken } = useAuth();
const config = useRuntimeConfig();
const apiUrl = config.public.SMA_API_URL;

setTimeout(() => {
  console.log("Checking and refreshing token from settimeout...");
  checkAndRefreshToken();
}, 1000);

const { data: connectUsers, error } = await useFetch(
  `${apiUrl}/follow/unfollowed`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
  }
);
if (error.value) {
  console.error("Error fetching users:", error.value);
}

definePageMeta({
  middleware: "auth",
  layout: "mainpage",
});
</script>

<style scoped>
/* Optional styles */
</style>
