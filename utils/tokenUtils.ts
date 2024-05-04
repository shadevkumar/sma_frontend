// Utility to check if the token is close to expiring
export const isTokenCloseToExpiry = (
  token: string | null | undefined,
  threshold: number = 5 * 60 * 1000 // Default threshold set to 5 minutes
): boolean => {
  if (!token) return false;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expTime = payload.exp * 1000; // Convert to milliseconds
  const timeToExpire = expTime - Date.now();
  // console.log(`Time to expire: ${timeToExpire}`);
  return timeToExpire < threshold;
};
