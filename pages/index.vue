<template>
  <div class="flex relative h-[90vh]">
    <div
      :class="{ hidden: !showFollowings }"
      class="followings_div md:block w-[60%] max-md:z-50 max-md:bg-[#ffffff] md:w-3/12 2xl:w-2/12 sticky top-[10vh] overflow-y-auto max-md:top-0 max-md:absolute"
    >
      <FollowedUsers />
    </div>
    <div
      class="timeline w-full md:w-9/12 2xl:w-10/12 sticky top-[10vh] overflow-y-auto"
    >
      <div class="flex flex-col h-full items-center overflow-y-auto">
        <div class="md:hidden w-full flex items-center justify-end px-6 pt-2">
          <button
            @click="toggleFollowings"
            class="bg-[#a3a3a7] text-base rounded-md px-2"
          >
            Profile
          </button>
        </div>
        <div class="flex w-full px-8 2xl:px-24 md:px-14 md:pt-4">
          <div
            @click="openAddPost"
            class="text-[#86878a] text-xl w-full md:w-[50%] bg-[#F9F9FB] cursor-pointer mt-4 p-4 rounded-md border"
          >
            <Icon name="material-symbols:add-circle" />
            Add Post...
          </div>
        </div>
        <AddPost ref="addPostComponent" />
        <Timeline :posts="latestPosts" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from "@/stores/uiStore";

const { $useAuthCookies } = useNuxtApp();
const { accessToken } = $useAuthCookies();
const config = useRuntimeConfig();
const apiUrl = config.public.SMA_API_URL;

const { setupTokenRefreshInterval } = useTokenRefresh();

onMounted(() => {
  setupTokenRefreshInterval();
});

const { data: posts, error } = await useFetch(`${apiUrl}/posts/following`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken.value}`,
  },
});

const latestPosts = computed(() =>
  posts.value ? [...posts.value].reverse() : []
);

if (error.value) {
  console.error("Error fetching posts:", error.value);
}

const uiStore = useUIStore();
const openAddPost = () => {
  uiStore.toggleAddPost();
};

const showFollowings = ref(false);
const toggleFollowings = () => {
  showFollowings.value = !showFollowings.value;
};

definePageMeta({
  middleware: "auth",
  layout: "mainpage",
});
</script>

<style lang="scss" scoped></style>
