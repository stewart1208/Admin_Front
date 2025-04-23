import axios from "@/Services/transportApi";

export const getAllPorts = async () => {
  const res = await axios.get("/port");
  return res.data;
};

export const getPortById = async (id) => {
  const res = await axios.get(`/port/${id}`);
  return res.data;
};

export const createPort = async (portData) => {
  const res = await axios.post("/port", portData);
  return res.data;
};

export const updatePort = async (id, updatedData) => {
  const res = await axios.put(`/port/${id}`, updatedData);
  return res.data;
};
