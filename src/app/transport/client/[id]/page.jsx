"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getById } from "@/Actions/Transport/Client";
import { Card, Descriptions, Tag, Spin, Alert } from "antd";

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await getById(id);
        setClient(data);
      } catch (err) {
        setError("Erreur lors du chargement du client");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  if (loading) return <Spin fullscreen />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <Card title={`Détails du client ${client.nom} ${client.prenom}`}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Téléphone">{client.numTelephone}</Descriptions.Item>
        <Descriptions.Item label="Date de naissance">
          {new Date(client.dateDeNassence).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Wilaya">{client.wilaya}</Descriptions.Item>
        <Descriptions.Item label="Daïra">{client.dayra}</Descriptions.Item>
        <Descriptions.Item label="Date de création">
          {new Date(client.create_At).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Réservations">
          {client.reservations.length > 0 ? (
            client.reservations.map(r => (
              <div key={r.id}>
                📅 {new Date(r.date).toLocaleDateString()} | Port ID: {r.portid}
              </div>
            ))
          ) : (
            <i>Aucune réservation</i>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ClientDetail;
