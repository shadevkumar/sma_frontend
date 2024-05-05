// plugins to provide Cookies at composables and in entire app
import { useCookie } from "nuxt/app";

export default defineNuxtPlugin(() => {
  const useAuthCookies = () => {
    const accessToken = useCookie("access_token");
    const refreshToken = useCookie("refresh_token");

    return { accessToken, refreshToken };
  };

  return {
    provide: {
      useAuthCookies: useAuthCookies,
    },
  };
});
