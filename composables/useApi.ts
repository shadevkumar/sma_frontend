
interface PostData {
  title: string;
  description: string;
}


export const createPost = async (postData: PostData, accessToken: string) => {

const config = useRuntimeConfig();
const apiUrl = config.public.SMA_API_URL;
  try {
    const response = await $fetch(`${apiUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    });

    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
