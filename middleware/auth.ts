import { useCookie, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $useAuthCookies } = useNuxtApp();
  const { accessToken }: Ref<string | null | undefined> = $useAuthCookies();

  // Redirect to home if trying to access login/signup while already authenticated
  if (accessToken.value && (to.path === "/login" || to.path === "/signup")) {
    return navigateTo("/");
  }

  if (!accessToken.value && to.path !== "/login" && to.path !== "/signup") {
    return navigateTo("/login");
  }
});
