<template>
  <teleport to="body">
    <div v-if="isVisible" class="modal">
      <form
        @submit.prevent="handleSubmit"
        class="bg-[#867272] h-96 w-[40%] p-6 gap-10 flex flex-col"
      >
        <input v-model="title" placeholder="Title" required />
        <textarea
          v-model="description"
          placeholder="Description"
          required
        ></textarea>
        <button class="bg-blue-500 py-1" type="submit">Publish</button>
        <button @click="close">Close</button>
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
const authorId = ref(null); // Initialize as null
const { checkAndRefreshToken } = useAuth();

onMounted(() => {
  if (process.client) {
    authorId.value = localStorage.getItem("userId"); // Access localStorage only on client side
  }
});
console.log("authorId", authorId.value);

const handleSubmit = async () => {
  try {
    await checkAndRefreshToken();
    await createPost(
      {
        title: title.value,
        description: description.value,
        authorId: authorId.value,
      },
      accessToken.value
    );
    title.value = "";
    description.value = "";
    uiStore.toggleAddPost();
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
