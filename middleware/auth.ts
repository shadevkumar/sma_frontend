import { useCookie, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $useAuthCookies } = useNuxtApp();
  const { accessToken } = $useAuthCookies();
  const { refreshTokens } = useAuth();

  // Redirect to home if trying to access login/signup while already authenticated
  if (accessToken.value && (to.path === "/login" || to.path === "/signup")) {
    return navigateTo("/");
  }

  if (!accessToken.value && to.path !== "/login" && to.path !== "/signup") {
    return navigateTo("/login");
  }

  // if (accessToken.value && isTokenCloseToExpiry(accessToken.value)) {
  //   await refreshTokens(); // Make sure this function is imported and correctly handles token refresh
  // }
});
