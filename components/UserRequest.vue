<template>
  <div class="w-full md:w-[30%] p-4 flex flex-col items-center ">
    <div><h1 class="text-xl w-full">Follow Requests</h1></div>
    <div
      v-for="request in requests"
      :key="request.followId"
      class="user-card m-2 w-full md:w-[90%] bg-white p-2 rounded-md flex items-center justify-between"
    >
      <span>{{ request.follower.username }}</span>
      <div class="flex">
        <button
          @click="acceptRequest(request.followId)"
          class="bg-blue-500 px-2 rounded-md mx-2"
        >
          Accept
        </button>
        <button
          @click="rejectRequest(request.followId)"
          class="bg-red-500 px-2 rounded-md mx-2"
        >
          Reject
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { acceptFollow, rejectFollow } = useFollow();
const config = useRuntimeConfig();
const apiUrl = config.public.SMA_API_URL;
const accessToken = useCookie("access_token");
const requests = ref([]);

const fetchRequests = async () => {
  try {
    const data = await $fetch(`${apiUrl}/follow/requests`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });
    requests.value = data;
  } catch (error) {
    console.error("Failed to fetch follow requests:", error);
  }
};

const acceptRequest = async (followId) => {
  try {
    await acceptFollow(followId, accessToken.value);
    requests.value = requests.value.filter(
      (request) => request.followId !== followId
    );
  } catch (error) {
    console.error("Failed to accept follow request:", error);
  }
};

const rejectRequest = async (followId) => {
  try {
    await rejectFollow(followId, accessToken.value);
    requests.value = requests.value.filter(
      (request) => request.followId !== followId
    );
  } catch (error) {
    console.error("Failed to reject follow request:", error);
  }
};

onMounted(fetchRequests);
</script>

<style scoped></style>
