"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, Spin, List } from "antd";
import { getById } from "../../../Actions/Mandateur";
import PortCard from "@/Components/port/PortCard";
import ClientCard from "@/Components/client/ClientCard";

const MandateurDetailPage = () => {
  const { id } = useParams();
  const [mandateur, setMandateur] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchMandateur = async () => {
        try {
          const data = await getById(id);
          setMandateur(data);
        } catch (error) {
          console.error("Erreur lors de la récupération du mandateur :", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMandateur();
    }
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!mandateur) {
    return <p>Aucun mandateur trouvé.</p>;
  }

  return (
    <div style={{ maxWidth: "100%", margin: "20px auto" }}>
      <Card title={`${mandateur.nom} ${mandateur.prenom}`}>
        <p><strong>Date de naissance:</strong> {new Date(mandateur.dateNaissance).toLocaleDateString()}</p>
        <p><strong>Téléphone:</strong> {mandateur.numTelephone}</p>
        <p><strong>Créé le:</strong> {new Date(mandateur.create_At).toLocaleDateString()}</p>
        
        <h3>📍 Port d'attache</h3>
        <Link href={`/port/${mandateur.port.id}`} style={{ width: "100%" }}>
        <PortCard port={mandateur.port}/>
        </Link>

        {mandateur.clients.length > 0 && (
          <>
            <h3>👥 Clients</h3>
            <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={mandateur.clients}
            renderItem={(client) => (
              <List.Item style={{ display: "flex", justifyContent: "center" }}>
                  <ClientCard client={client} />
              </List.Item>
            )}
          />
          </>
        )}

        {mandateur.navires.length > 0 && (
          <>
            <h3>🚢 Navires</h3>
            <List
              bordered
              dataSource={mandateur.navires}
              renderItem={(navire) => (
                <Link href={`/navire/${navire.id}`} style={{ textDecoration: "none" }}>
                <List.Item>
                  <strong>{navire.nom}</strong> (Matricule: {navire.matricule}) - Propriétaire: {navire.proprietaire}
                </List.Item>
                </Link>
              )}
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default MandateurDetailPage;
