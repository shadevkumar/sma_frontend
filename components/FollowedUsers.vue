<template>
  <div class="flex flex-col items-center">
    <h1 class="text-lg font-bold mb-4">Followings</h1>
    <div v-for="user in followedUsers" :key="user._id" class="user-card">
      <span>{{ user.username }}</span>
      <button
        @click="handleUnFollow(user._id)"
        class="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        Unfollow
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const accessToken = useCookie("access_token").value;
const followedUsers = ref([]);
const config = useRuntimeConfig();
const apiUrl = config.public.SMA_API_URL;

const { unFollowUser } = useFollow();

const fetchFollowedUsers = async () => {
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

onMounted(fetchFollowedUsers);
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
