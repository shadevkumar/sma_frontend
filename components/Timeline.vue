<template>
  <div class="w-[50%] p-6 m-4">
    <div v-if="posts.length === 0" class="text-center p-10">
      <p class="text-xl">Follow others to see their posts!</p>
    </div>
    <div
      v-else
      v-for="post in posts"
      :key="post.id"
      class="bg-white rounded-md my-6 p-4 border border-gray-200 shadow-md min-h-48"
    >
      <div class="flex gap-6 items-center text-sm">
        <p>{{ post.author.username }}</p>
        <p>{{ formatCreatedAt(post.createdAt) }}</p>
      </div>
      <h3 class="text-2xl font-semibold">{{ post.title }}</h3>
      <p class="text-lg">{{ post.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import {
  parseISO,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

const props = defineProps<{
  posts: Array<{ id: number; title: string; description: string }>;
}>();

const formatCreatedAt = (dateString) => {
  const now = new Date();
  const date = parseISO(dateString);
  const diffMinutes = differenceInMinutes(now, date);
  const diffHours = differenceInHours(now, date);
  const diffDays = differenceInDays(now, date);

  if (diffMinutes < 1) {
    return "just now";
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  } else {
    const diffHours = differenceInHours(now, date);
    if (diffHours < 24) {
      return `${diffHours}h`;
    } else {
      const diffDays = differenceInDays(now, date);
      return `${diffDays}d`;
    }
  }
};
</script>

<style lang="scss" scoped></style>
