import api from "../Services/api";

const getAll = async () => {
  try {
    console.log("🔍 Appel API pour récupérer les Articles...");
    const response = await api.get("/article");
    console.log("✅ Données reçues:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur API:", error.response?.data || error.message);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const response = await api.get(`/article/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération de l'article ${id}:`, error);
    throw error;
  }
};

const create = async (articleData) => {
  try {
    console.log("➕ Création d'un nouvel article...");
    const response = await api.post("/article", articleData);
    console.log("✅ Article créé:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la création de l'article:", error.response?.data || error.message);
    throw error;
  }
};

const update = async (id, articleData) => {
  try {
    console.log(`🔄 Mise à jour de l'article ${id}...`);
    const response = await api.put(`/article/${id}`, articleData);
    console.log("✅ Article mis à jour:", response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors de la mise à jour de l'article ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export { getAll, getById, create, update };
