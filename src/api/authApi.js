import httpClient from "./httpClient";

export async function login(payload) {
  const { data } = await httpClient.post("/auth/login", payload);
  return data;
}

export async function getProfile() {
  const { data } = await httpClient.get("/auth/me");
  return data;
}
