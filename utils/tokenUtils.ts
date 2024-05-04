// Utility to check if the token is close to expiring
export const isTokenCloseToExpiry = (
  token: string | null | undefined,
  threshold: number = 5 * 60 * 1000 // Default threshold set to 5 minutes
): boolean => {
  if (!token) return false;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expTime = payload.exp * 1000; // Convert to milliseconds
  const currentTime = Date.now();
  const timeToExpire = expTime - currentTime;
  // console.log(
  //   `Current Time: ${currentTime}, Expiration Time: ${expTime}, Time to Expire: ${timeToExpire}`
  // );
  return timeToExpire < threshold && timeToExpire > 0;
};
