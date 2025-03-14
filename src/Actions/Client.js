import api from "../Services/api"

const getAll = async () => {
    try {
      console.log("🔍 Appel API pour récupérer les Clients...")
      const response = await api.get("/client")
      console.log("✅ Données reçues:", response.data)
      return response.data
    } catch (error) {
      console.error("❌ Erreur API:", error.response?.data || error.message)
      throw error
    }
  }
const getById = async (id) => {
  try {
    const response = await api.get(`/client/${id}`)
    return response.data
  } catch (error) {
    console.error(`Erreur lors de la récupération du Client ${id}:`, error)
    throw error
  }
}

export {getById, getAll}
