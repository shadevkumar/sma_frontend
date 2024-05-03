import { isTokenCloseToExpiry } from "@/utils/tokenUtils";

interface User {
  username: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  sub: string;
  username: string;
}

interface ErrorResponse {
  response?: {
    statusCode?: number;
    message?: string;
  };
}

export const useAuth = () => {
  const { $useAuthCookies } = useNuxtApp();
  const { accessToken, refreshToken }: Ref<string | null> = $useAuthCookies();

  const config = useRuntimeConfig();
  const apiUrl = config.public.SMA_API_URL;

  const signup = async (user: User) => {
    try {
      const response = await $fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(user),
      });
      return response;
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      if (typedError.response && typedError.response.statusCode === 409) {
        throw new Error("Username already taken");
      } else {
        throw new Error(
          typedError.response?.message || "An error occurred during signup"
        );
      }
    }
  };

  const login = async (user: User) => {
    try {
      const response = await $fetch<AuthResponse>(`${apiUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(user),
      });
      accessToken.value = response.access_token;
      refreshToken.value = response.refresh_token;
      localStorage.setItem("userId", response.sub); // Store user ID
      localStorage.setItem("username", response.username); // Store username
      return response;
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      if (typedError.response && typedError.response.statusCode === 401) {
        throw new Error("Invalid credentials");
      } else {
        throw new Error(
          typedError.response?.message || "An error occurred during login"
        );
      }
    }
  };

  const refreshTokens = async () => {
    try {
      console.log("Attempting to refresh tokens inside refreshTokens...");

      const response = await $fetch<AuthResponse>(`${apiUrl}/auth/refresh`, {
        method: "POST",
        body: JSON.stringify({ refreshToken: refreshToken.value }),
      });
      console.log("Tokens refreshed successfully.");
      accessToken.value = response.access_token;
      refreshToken.value = response.refresh_token;
    } catch (error) {
      console.error("Failed to refresh tokens:", error);
      throw new Error("Failed to refresh tokens after several attempts");
    }
  };

  const checkAndRefreshToken = async () => {
    if (isTokenCloseToExpiry(accessToken.value)) {
      await refreshTokens();
    }
  };

  const logout = async (userId: string) => {
    try {
      console.log("userId", userId);
      if (userId) {
        await $fetch(`${apiUrl}/auth/logout`, {
          method: "POST",
          body: JSON.stringify({ userId }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.value}`,
          },
        });
      }
      // Clear local storage and tokens
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      accessToken.value = null;
      refreshToken.value = null;
      navigateTo("/login");
    } catch (error) {
      throw new Error("Logout failed");
    }
  };

  return {
    signup,
    login,
    logout,
    refreshTokens,
    checkAndRefreshToken,
  };
};
