export const isAuthenticated = () => {
    return typeof window !== "undefined" && !!localStorage.getItem("token");
  };
  
  export const login = (token: string) => {
    localStorage.setItem("token", token);
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  