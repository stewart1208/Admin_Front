import api from "../../Services/transportApi";


export const getAllReservations = async () => {
  const res = await api.get("/reservation");
  return res.data;
};

export const getReservationById = async (id) => {
  const res = await api.get(`/reservation/${id}`);
  return res.data;
};

export const getValidReservations = async () => {
  const res = await api.get(`/reservation/valide`);
  return res.data;
};

export const getNonValidReservations = async () => {
  const res = await api.get(`/reservation/nonvalide`);
  return res.data;
};

export const getReservationsByClient = async (clientid) => {
  const res = await api.get(`/reservation/client/${clientid}`);
  return res.data;
};

export const getReservationsByProprietaire = async (proprietaireid) => {
  const res = await api.get(`/reservation/proprietaire/${proprietaireid}`);
  return res.data;
};
