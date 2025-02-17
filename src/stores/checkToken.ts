export function isTokenExpired(token: string): boolean {
    try {
      // Decode the token
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Get the current timestamp
      const currentTime = Math.floor(Date.now() / 1000);
      // Check if the token has expired
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Invalid token format', error);
      return true; // Consider the token expired if it's invalid
    }
  }
  
