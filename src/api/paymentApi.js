import httpClient from "./httpClient";

export async function createCheckoutSession(payload) {
  const { data } = await httpClient.post("/checkout/session", payload);
  return data.result;
}
