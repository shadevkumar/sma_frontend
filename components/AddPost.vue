<template>
  <teleport to="body">
    <div v-if="isVisible" class="modal z-50">
      <form
        @submit.prevent="handleSubmit"
        class="bg-[#1c1c1c] h-[50vh] md:h-96 w-[95%] md:w-[40%] p-6 gap-10 flex flex-col justify-between rounded-md focus:outline-none shadow-lg border-none"
      >
        <div class="flex flex-col gap-8">
          <input
            v-model="title"
            placeholder="Title"
            required
            class="h-10 p-4 bg-[#2c2c2c] text-white resize-none rounded-md focus:outline-0"
          />
          <textarea
            v-model="description"
            placeholder="Description"
            required
            class="min-h-36 md:min-h-32 p-4 bg-[#2c2c2c] text-white resize-none rounded-md focus:outline-0"
          ></textarea>
        </div>
        <div class="flex gap-4 justify-end">
          <button @click="close" class="text-white">Close</button>

          <button
            :class="postSuccess ? 'bg-green-500' : 'bg-zinc-200'"
            :disabled="postSuccess"
            class="py-1 px-2 rounded-md text-black"
            type="submit"
          >
            {{ postSuccess ? "Published" : "Publish" }}
          </button>
        </div>
      </form>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createPost } from "@/composables/useApi";
import { useUIStore } from "@/stores/uiStore";

const accessToken = useCookie("access_token");
const uiStore = useUIStore();
const isVisible = computed(() => uiStore.isAddPostVisible);
const title = ref("");
const description = ref("");
const authorId = ref(null);
const postSuccess = ref(false); // State to track if the post was successfully created
// const { checkAndRefreshToken } = useTokenRefresh();

onMounted(() => {
  if (process.client) {
    authorId.value = localStorage.getItem("userId");
  }
});

const handleSubmit = async () => {
  try {
    // await checkAndRefreshToken();

    await createPost(
      {
        title: title.value,
        description: description.value,
        authorId: authorId.value,
      },
      accessToken.value
    );
    postSuccess.value = true;
    title.value = "";
    description.value = "";
    setTimeout(() => {
      uiStore.toggleAddPost();
      postSuccess.value = false; // Close the modal after 2 seconds
    }, 2000);
  } catch (error) {
    console.error("Failed to create post:", error);
  }
};

const close = () => {
  uiStore.toggleAddPost();
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
