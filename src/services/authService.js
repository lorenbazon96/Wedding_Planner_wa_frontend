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
