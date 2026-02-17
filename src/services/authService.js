import api from "../api.js";

export const register = async (userData) => {
  const res = await api.post("/auth/register", userData);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const login = async ({ email, password }) => {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get("/auth/profile");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/auth/profile", data);
  return res.data;
};
