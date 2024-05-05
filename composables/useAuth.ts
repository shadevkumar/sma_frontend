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
  statusCode?: number;
  message?: string;
}

export const useAuth = () => {
  const { $useAuthCookies } = useNuxtApp();
  const {
    accessToken,
    refreshToken,
  }: {
    accessToken: Ref<string | null | undefined>;
    refreshToken: Ref<string | null | undefined>;
  } = $useAuthCookies();

  const config = useRuntimeConfig();
  const apiUrl = config.public.SMA_API_URL;

  let userId: string | null = null;
  if (process.client) {
    userId = localStorage.getItem("userId");
  }

  const signup = async (user: User) => {
    try {
      const response = await $fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(user),
      });
      return response;
    } catch (error: unknown) {
      console.error("Signup Error:", error);
      const typedError = error as ErrorResponse;
      if (typedError.statusCode === 409) {
        throw new Error("Username already taken");
      } else {
        throw new Error(
          typedError.message || "An error occurred during signup"
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
      if (typedError.statusCode === 401) {
        throw new Error("Invalid credentials");
      } else {
        throw new Error(typedError.message || "An error occurred during login");
      }
    }
  };

  let isRefreshing = false;
  const refreshTokens = async () => {
    // console.log("refreshToken.value at refreshToken func:", refreshToken.value);
    if (!refreshToken.value) {
      console.error("Refresh token is missing.");
    }
    const currentRefreshToken = refreshToken.value;
    // console.log("OldRefreshToken", OldRefreshToken);

    if (!currentRefreshToken) {
      console.error("currentRefreshToken is missing.");
    }

    if (isRefreshing) return;
    isRefreshing = true;

    try {
      const response = await $fetch<AuthResponse>(`${apiUrl}/auth/refresh`, {
        method: "POST",
        body: JSON.stringify({ refreshToken: currentRefreshToken }),
      });
      accessToken.value = response.access_token;
      refreshToken.value = response.refresh_token;
      // console.log("Tokens refreshed successfully:", response.refresh_token);
    } catch (error) {
      console.error("Failed to refresh tokens logout:", error);
      logout(userId); // Ensure logout is handled correctly
      navigateTo("/login");
    } finally {
      isRefreshing = false;
    }
  };

  const logout = async (userId: string | null) => {
    try {
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
  };
};
