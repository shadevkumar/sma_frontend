export const useTokenRefresh = () => {
  const { refreshTokens } = useAuth();

  const setupTokenRefreshInterval = () => {
    const intervalTime = 2 * 60 * 1000; // Check every 2 minutes
    const { $useAuthCookies } = useNuxtApp();
    const {
      accessToken,
    }: {
      accessToken: Ref<string | null | undefined>;
    } = $useAuthCookies();

    setInterval(async () => {
      if (accessToken.value && isTokenCloseToExpiry(accessToken.value)) {
        await refreshTokens();
      }
    }, intervalTime);
  };

  return {
    setupTokenRefreshInterval,
  };
};
