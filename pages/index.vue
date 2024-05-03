<template>
  <div class="flex items-center justify-center">
    <div>
      <FollowedUsers />
    </div>
    <div class="flex flex-col items-center justify-center">
      <div
        @click="openAddPost"
        class="text-[#B4B5B8] text-xl w-[90%] md:w-[40%] bg-[#F9F9FB] cursor-pointer mt-6 p-4 rounded-md"
      >
        Add Post...
      </div>
      <AddPost ref="addPostComponent" />
      <Timeline :posts="latestPosts" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from "@/stores/uiStore";

const { $useAuthCookies } = useNuxtApp();
const { accessToken } = $useAuthCookies();
const { checkAndRefreshToken } = useAuth();
const config = useRuntimeConfig();
const apiUrl = config.public.SMA_API_URL;

setTimeout(() => {
  console.log("Checking and refreshing token from settimeout...");
  checkAndRefreshToken();
}, 1000);

const { data: posts, error } = await useFetch(`${apiUrl}/posts/following`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken.value}`,
  },
});

const latestPosts = computed(() =>
  posts.value ? [...posts.value].reverse() : []
);

// console.log("posts", posts._rawValue);

if (error.value) {
  console.error("Error fetching posts:", error.value);
}

const uiStore = useUIStore();
const openAddPost = () => {
  uiStore.toggleAddPost();
};

definePageMeta({
  middleware: "auth",
  layout: "mainpage",
});
</script>

<style lang="scss" scoped></style>
