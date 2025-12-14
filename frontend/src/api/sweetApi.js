import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/sweets",
  withCredentials: true, // optional, needed for cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllSweets = () => api.get("/getAll");
export const searchSweets = (params) => api.get("/search", { params });
export const addSweet = (data) => api.post("/add", data);
export const updateSweet = (id, data) => api.put(`/${id}`, data);
export const deleteSweet = (id) => api.delete(`/${id}`);

export const purchaseSweet = (id) => api.post(`/${id}/purchase`);
export const restockSweet = (id, quantity) =>api.post(`/${id}/restock`, { quantity });