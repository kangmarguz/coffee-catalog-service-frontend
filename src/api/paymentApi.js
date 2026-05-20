import httpClient from "./httpClient";

export async function createCheckoutSession(payload) {
  const { data } = await httpClient.post("/checkout/session", payload);
  return data.result;
}

export async function completeCheckoutSession(sessionId) {
  const { data } = await httpClient.post("/checkout/session/complete", { sessionId });
  return data.result;
}
