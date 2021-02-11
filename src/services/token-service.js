const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem("TOKEN", token);
  },
  getAuthToken() {
    return window.localStorage.getItem("TOKEN")
  },
  clearAuthToken() {
    window.localStorage.removeItem("TOKEN");
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  }
};

export default TokenService;
