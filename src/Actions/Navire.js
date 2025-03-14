import api from "../Services/api"

const getAll = async () => {
    try {
      console.log("🔍 Appel API pour récupérer les navires...")
      const response = await api.get("/navire")
      console.log("✅ Données reçues:", response.data)
      return response.data
    } catch (error) {
      console.error("❌ Erreur API:", error.response?.data || error.message)
      throw error
    }
  }
const getById = async (id) => {
  try {
    const response = await api.get(`/navire/${id}`)
    return response.data
  } catch (error) {
    console.error(`Erreur lors de la récupération du mandateur ${id}:`, error)
    throw error
  }
}

export {getById, getAll}
