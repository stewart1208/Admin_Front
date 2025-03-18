import api from "../Services/api";
import Cookies from "js-cookie";

const token = Cookies.get("token")

const getAll = async () => {
  try {
      console.log("🔍 Appel API pour récupérer les ports...");
      console.log("Token : " +token)
      const response = await api.get("/port", {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
      });

      console.log("✅ Données reçues:", response.data);
      return response.data;
  } catch (error) {
      console.error("❌ Erreur API:", error.response?.data || error.message);
      throw error;
  }
};
  
const getById = async (id) => {
  try {
    const response = await api.get(`/port/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du port ${id}:`, error);
    throw error;
  }
};
const create = async (data) => {
  try {
    const response = await api.post("/port", data);
    console.log("Réponse API:", response.data); // Vérifie ce qui est retourné
    return response.data; // Assure-toi que `response.data` contient bien le port
  } catch (error) {
    console.error("Erreur lors de la création du port:", error);
    throw error;
  }
};
const update = async (id, data) => {
  try {
    const response = await api.put(`/port/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du port ${id}:`, error);
    throw error;
  }
};
const addUgpToPort = async (portId, ugpID) => {
  try {
    console.log(portId)
    console.log(ugpID)
    const response = await api.put(`/port/${portId}/add-ugp-to-port`, { ugpID });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'UGP au port :", error);
    throw error;
  }
};

export { create, getById, getAll, update,addUgpToPort};
