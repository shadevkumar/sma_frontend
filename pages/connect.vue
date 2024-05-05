<template>
  <div class="flex max-md:flex-col-reverse justify-center gap-6">
    <ConnectUsers :users="connectUsers" />
    <UserRequest />
  </div>
</template>

<script setup lang="ts">
const { $useAuthCookies } = useNuxtApp();
const { accessToken } = $useAuthCookies();
const config = useRuntimeConfig();
const apiUrl = config.public.SMA_API_URL;
const connectUsers = ref([]); 


const { data, error } = await useFetch(`${apiUrl}/follow/unfollowed`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken.value}`,
  },
});
if (data.value) {
  connectUsers.value = data.value; 
}
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
