import httpClient from "./httpClient";

export async function getCoffees(params = {}) {
  const { data } = await httpClient.get("/coffees", { params });
  return data;
}

export async function getCoffeeById(id) {
  const { data } = await httpClient.get(`/coffees/${id}`);
  return data;
}

export async function createCoffee(payload) {
  const { data } = await httpClient.post("/coffees", payload);
  return data;
}

export async function updateCoffee(id, payload) {
  const { data } = await httpClient.patch(`/coffees/${id}`, payload);
  return data;
}

export async function deleteCoffee(id) {
  const { data } = await httpClient.delete(`/coffees/${id}`);
  return data;
}

