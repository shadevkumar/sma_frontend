<template>
  <section class="w-[30%] py-4 flex flex-col items-center">
    <h2>Suggestions for you</h2>
    <div class="bg-white w-[90%]">
      <div
        v-for="user in users"
        :key="user._id"
        class="flex justify-between p-2 m- border-b"
      >
        <span>{{ user.username }}</span>
        <button
          @click="handleRequest(user._id)"
          class="bg-[#161616] text-white px-2 rounded-md"
          :class="{ 'bg-gray-400': followStatus[user._id] }"
        >
          {{ followStatus[user._id] ? "Requested" : "Follow" }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useFollow } from "@/composables/useFollow";
const accessToken = useCookie("access_token");

const { followRequest } = useFollow();

const followStatus = ref({});

const handleRequest = async (userId) => {
  try {
    await followRequest(userId, accessToken.value);
    followStatus.value[userId] = true;
  } catch (error) {
    console.error("Failed to send follow Request:", error);
  }
};

const props = defineProps<{
  users: Array<{ username: string; id: number }>;
}>();
</script>
