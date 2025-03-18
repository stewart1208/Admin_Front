import api from "../Services/api";

const getAll = async () => {
  try {
    console.log("🔍 Récupération des productions...");
    const response = await api.get("/production");
    console.log("✅ Productions reçues :", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des productions :", error.response?.data || error.message);
    throw error;
  }
};

const getById = async (id) => {
  try {
    console.log(`🔍 Récupération de la production ${id}...`);
    const response = await api.get(`/production/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération de la production ${id} :`, error);
    throw error;
  }
};

export { getAll, getById };
