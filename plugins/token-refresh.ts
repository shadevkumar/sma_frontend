import { defineNuxtPlugin } from "#app";
import { useTokenRefresh } from "@/composables/useTokenRefresh";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", () => {
    const { setupTokenRefreshInterval } = useTokenRefresh();
    setupTokenRefreshInterval();
  });
});
