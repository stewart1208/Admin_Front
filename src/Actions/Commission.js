import api from "@/Services/api";

export const getAll = async () => {
  try {
    const response = await api.get("/commission");
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des commissions :", error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};

export const getById = async (id) => {
  try {
    const response = await api.get(`/commission/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération de la commission (ID: ${id}):`, error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};

export const updateState = async (id, state) => {
  try {
    const response = await api.put(`/commission/${id}`, { state });
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors de la mise à jour de l'état de la commission (ID: ${id}):`, error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};
