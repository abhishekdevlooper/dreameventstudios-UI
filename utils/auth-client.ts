const CLIENT_TOKEN_KEY = "client_token";

export const setClientToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CLIENT_TOKEN_KEY, token);
  }
};

export const getClientToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(CLIENT_TOKEN_KEY);
  }
  return null;
};

export const removeClientToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CLIENT_TOKEN_KEY);
  }
};

export const isClientLoggedIn = (): boolean => {
  return !!getClientToken();
};
