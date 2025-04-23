import axios from "@/Services/transportApi"

export const getAllLocations = async () => {
  const res = await axios.get("/location");
  return res.data;
};

export const getLocationById = async (id) => {
  const res = await axios.get(`/location/${id}`);
  return res.data;
};

export const getLocationByClientId = async (id) => {
  const res = await axios.get(`/location/client/${id}`);
  return res.data;
};

export const getLocationByNavireId = async (id) => {
  const res = await axios.get(`/location/navire/${id}`);
  return res.data;
};

export const getLocationByProprietaireId = async (id) => {
  const res = await axios.get(`/location/proprietaire/${id}`);
  return res.data;
};
