export const useFollow = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.SMA_API_URL;

  //   const fetchUsers = async () => {
  //     try {
  //       return await $fetch(`${apiUrl}/follow/unfollowed`);
  //     } catch (error) {
  //       console.error("Failed to fetch users:", error);
  //       throw error;
  //     }
  //   };

  const followRequest = async (followerId: string, accessToken: string) => {
    try {
      return await $fetch(`${apiUrl}/follow/request/${followerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error("Failed to send follow request:", error);
      throw error;
    }
  };
  const acceptFollow = async (followId: string, accessToken: string) => {
    try {
      return await $fetch(`${apiUrl}/follow/accept/${followId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error("Failed to accept follow request:", error);
      throw error;
    }
  };

  const rejectFollow = async (followId: string, accessToken: string) => {
    try {
      return await $fetch(`${apiUrl}/follow/reject/${followId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error("Failed to reject follow request:", error);
      throw error;
    }
  };

  const unFollowUser = async (followingId: string, accessToken: string) => {
    try {
      return await $fetch(`${apiUrl}/follow/${followingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error("Failed to unfollow user:", error);
      throw error;
    }
  };

  return { followRequest, acceptFollow, rejectFollow, unFollowUser };
};
