import httpClient from "./httpClient";

export async function getOrders(params = {}) {
  const { data } = await httpClient.get("/orders", { params });
  return data;
}
