<template>
  <div><SignUpForm /></div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<style scoped></style>
