"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, Spin } from "antd";
import { getById } from "../../../../Actions/Client";
import MandateurCard from "@/Components/mandateur/MandateurSimpleCard";

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        try {
          const data = await getById(id);
          setClient(data);
        } catch (error) {
          console.error("❌ Erreur lors de la récupération du client:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchClient();
    }
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!client) {
    return <p>⚠️ Aucun client trouvé.</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <Card title={`👤 ${client.nom} ${client.prenom}`}>
        <p><strong>📞 Téléphone:</strong> {client.numTelephone}</p>
        <h1>Mandateur :</h1>
        {client.mandateur && (
          <MandateurCard mandateur={client.mandateur}/>
        )}
        <p><strong>📅 Créé le:</strong> {new Date(client.create_At).toLocaleDateString()}</p>
      </Card>
    </div>
  );
};

export default ClientDetails;
