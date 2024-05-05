<template>
  <div class="h-screen">
    <Header />

    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useTokenRefresh } from "@/composables/useTokenRefresh";

const { setupTokenRefreshInterval } = useTokenRefresh();

onMounted(() => {

  setupTokenRefreshInterval();
});
</script>

<style lang="scss" scoped></style>
