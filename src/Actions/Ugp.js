import api from "../Services/api"

export const createUgp = async (data) => {
  try {
    const response = await api.post("/ugp", data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'UGP:", error);
    throw error;
  }
};

export const getAllUgp = async () => {
    try {
      const response = await api.get("/ugp");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des UGPs:", error);
      throw error;
    }
  };

  export const getUgpById = async (id) => {
    try {
      const response = await api.get(`/ugp/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'UGP:", error);
      throw error;
    }
  };

export const updateUgp = async (id, data) => {
  try {
    const response = await api.put(`/ugp/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'UGP ${id}:`, error);
    throw error;
  }
};

export const bloqueUgp = async (id) => {
  try {
    const response = await api.put(`/ugp/${id}/bloquer`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors du blocage de l'UGP ${id}:`, error);
    throw error;
  }
};

export const debloqueUgp = async (id) => {
  try {
    const response = await api.put(`/ugp/${id}/debloquer`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors du déblocage de l'UGP ${id}:`, error);
    throw error;
  }
};
export default getUgpById;
