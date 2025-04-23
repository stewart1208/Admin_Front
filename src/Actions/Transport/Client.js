import api from "../../Services/transportApi";

export const getAll = async () => {
  try {
    const response = await api.get("/client");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des clients:", error);
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await api.get(`/client/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du client ${id}:`, error);
    throw error;
  }
};
