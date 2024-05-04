// composables/useTokenRefresh.ts
import { useAuth } from "./useAuth";

export const useTokenRefresh = () => {
  const { $useAuthCookies } = useNuxtApp();
  const { refreshTokens } = useAuth();

  const {
    accessToken,
  }: {
    accessToken: Ref<string | null | undefined>;
  } = $useAuthCookies();

  const checkAndRefreshToken = async () => {
    if (isTokenCloseToExpiry(accessToken.value)) {
      await refreshTokens();
    }
  };

  // Set up an interval to check token expiry
  const setupTokenRefreshInterval = () => {
    const intervalTime = 60 * 1000; // Check every minute
    setInterval(async () => {
      if (isTokenCloseToExpiry(accessToken.value, 60 * 1000)) {
        // Check if the token expires in the next minute
        await refreshTokens();
      }
    }, intervalTime);
  };

  return {
    checkAndRefreshToken,
    setupTokenRefreshInterval,
  };
};
