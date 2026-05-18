const ADMIN_TOKEN_KEY = "coffeeCatalogAdminToken";
const ADMIN_USER_KEY = "coffeeCatalogAdminUser";

export function isAdminSessionActive() {
  return Boolean(getAdminToken());
}

export function getAdminToken() {
  return window.localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function startAdminSession({ token, user }) {
  window.localStorage.setItem(ADMIN_TOKEN_KEY, token);

  if (user) {
    window.localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
  }
}

export function endAdminSession() {
  window.localStorage.removeItem(ADMIN_TOKEN_KEY);
  window.localStorage.removeItem(ADMIN_USER_KEY);
}
