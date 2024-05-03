// Utility to check if the token is close to expiring
export const isTokenCloseToExpiry = (token: string | null): boolean => {
  if (!token) return false;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expTime = payload.exp * 1000; // Convert to milliseconds
  const timeToExpire = expTime - Date.now();
  console.log(`Time to expire: ${timeToExpire}`);
  return timeToExpire < 5 * 60 * 1000; // 5 minutes before expiring
};
811091 < 300000