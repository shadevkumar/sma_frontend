<template>
  <div class="flex flex-col items-center border-r border-[#dbdbdb] h-[90vh]">
    <div class="flex flex-col items-start w-full px-6 py-2">
      <p>{{ profileName }}</p>
      <h1 class="text-base font-semibold mb-4">
        {{ followingCount }} Followings
      </h1>
    </div>
    <div
      v-for="user in followedUsers"
      :key="user._id"
      class="user-card rounded-md flex justify-between items-center bg-white"
    >
      <span>{{ user.username }}</span>
      <button
        @click="handleUnFollow(user._id)"
        class="ml-4 bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1 max-md:text-xs px-1 md:px-2 rounded"
      >
        Unfollow
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const accessToken = useCookie("access_token").value;
let followedUsers = ref([]);
const config = useRuntimeConfig();
const apiUrl = config.public.SMA_API_URL;
const { refreshTokens } = useAuth();

const { unFollowUser } = useFollow();

const profileName = ref("Anonymous");

const fetchFollowedUsers = async () => {
  if (isTokenCloseToExpiry(accessToken)) {
    await refreshTokens();
  }
  try {
    const data = await $fetch(`${apiUrl}/follow/followed`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    followedUsers.value = data;
  } catch (error) {
    console.error("Failed to fetch followed users:", error);
  }
};

const followingCount = computed(() => followedUsers.value.length);

const handleUnFollow = async (userId) => {
  try {
    await unFollowUser(userId, accessToken);
    followedUsers.value = followedUsers.value.filter(
      (user) => user._id !== userId
    );
  } catch (error) {
    console.error("Failed to unfollow user:", error);
  }
};

onMounted(() => {
  if (typeof window !== "undefined") {
    // Access localStorage only on the client side
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      profileName.value = storedUsername;
    }
  }
  fetchFollowedUsers();
});
</script>

<style scoped>
.user-card {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  width: 90%;
  text-align: center;
}
</style>
