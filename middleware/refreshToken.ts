// middleware/refreshToken.ts
import { useTokenRefresh } from "@/composables/useTokenRefresh";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { checkAndRefreshToken } = useTokenRefresh();
  await checkAndRefreshToken();
});
