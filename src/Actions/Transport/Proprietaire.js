import api from "../../Services/transportApi";

// 🔍 Récupérer tous les propriétaires
const getAll = async () => {
  try {
    console.log("🔍 Appel API pour récupérer les propriétaires...");
    const response = await api.get("/proprietaire");
    console.log("✅ Données reçues:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur API:", error.response?.data || error.message);
    throw error;
  }
};

// 📥 Récupérer un propriétaire par ID
const getById = async (id) => {
  try {
    console.log(`ID: ${id}`,);
    const response = await api.get(`/proprietaire/${id}`);
    console.log("✅ Données reçues:", response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération du propriétaire ${id}:`, error);
    throw error;
  }
};

// ✅ Récupérer les propriétaires valides
const getValides = async () => {
  try {
    const response = await api.get("/proprietaire/valide");
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des propriétaires valides:", error);
    throw error;
  }
};

// ❌ Récupérer les propriétaires non valides
const getNonValides = async () => {
  try {
    const response = await api.get("/proprietaire/nonvalide");
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des propriétaires non valides:", error);
    throw error;
  }
};

// 🔄 Valider un propriétaire
const valider = async (id, data = {}) => {
  try {
    console.log(`🔄 Validation du propriétaire ${id}...`);
    const response = await api.put(`/proprietaire/${id}`, data);
    console.log("✅ Propriétaire validé:", response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors de la validation du propriétaire ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// 🗑️ Supprimer un propriétaire
const supprimer = async (id) => {
  try {
    const response = await api.delete(`/proprietaire/${id}`);
    console.log(`✅ Propriétaire ${id} supprimé`);
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur lors de la suppression du propriétaire ${id}:`, error);
    throw error;
  }
};

export {
  getAll,
  getById,
  getValides,
  getNonValides,
  valider,
  supprimer
};
