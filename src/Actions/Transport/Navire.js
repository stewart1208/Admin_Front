import axios from "@/Services/transportApi";

export const getAllNavires = async () => {
  const res = await axios.get("/navire");
  return res.data;
};

export const getNavireById = async (id) => {
  const res = await axios.get(`/navire/${id}`);
  return res.data;
};

export const getNaviresByPortId = async (portid) => {
  const res = await axios.get(`/navire/port/${portid}`);
  return res.data;
};

export const getNaviresByProprietaireId = async (proprietaireid) => {
  const res = await axios.get(`/navire/proprietaire/${proprietaireid}`);
  return res.data;
};
