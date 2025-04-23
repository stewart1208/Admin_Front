"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getById } from "../../../../Actions/Port";
import { Card, Spin, Alert, List, Button } from "antd";
import EditPortDrawer from "../../../../Components/port/UpDatePort"; // Importation du composant
import MandateurCard from "@/Components/mandateur/MandateurSimpleCard";

function PortDetail() {
  const { id } = useParams();
  const [port, setPort] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editVisible, setEditVisible] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPort = async () => {
      setLoading(true);
      try {
        const data = await getById(id);
        setPort(data);
      } catch (err) {
        setError("Impossible de récupérer le port.");
      } finally {
        setLoading(false);
      }
    };

    fetchPort();
  }, [id]);

  const handlePortUpdated = (updatedPort) => {
    setPort(updatedPort);
  };

  if (!id || loading) return <Spin size="large" />;
  if (error) return <Alert message="Erreur" description={error} type="error" showIcon />;
  if (!port) return <p>Aucun port trouvé.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Card
        title={port.matricule}
        extra={<Button onClick={() => setEditVisible(true)} type="primary">Modifier</Button>}
      >
        <p><strong>Matricule:</strong> {port.matricule}</p>
        <p><strong>Dayra:</strong> {port.dayra}</p>
        <p><strong>Wilaya:</strong> {port.wilaya}</p>
        
{port.ugp && <p><strong>UGP:</strong> {port.ugp.dayra}</p>}
        {port.create_At && (
          <p><strong>Créé le:</strong> {new Date(port.create_At).toLocaleDateString()}</p>
        )}

        {/* Mandateurs */}
        {port.mandateurs?.length > 0 ? (
          <>
            <h3>Mandateurs :</h3>
            <List
              dataSource={port.mandateurs}
              renderItem={(mandateur) => (
                <List.Item>
                  {/*<Card title={mandateur.nom} style={{ width: "100%" }}>
                    <p><strong>Prénom:</strong> {mandateur.prenom}</p>
                    <p><strong>Téléphone:</strong> {mandateur.numTelephone}</p>
                  </Card>*/}
                    <Link href={`/mandateur/${mandateur.id}`}>
                  <MandateurCard mandateur={mandateur}/>
                    </Link>
                </List.Item>
              )}
            />
          </>
        ) : (
          <p>Aucun mandateur trouvé.</p>
        )}

        {/* Navires */}
        {port.navires?.length > 0 ? (
          <>
            <h3>Navires :</h3>
            <List
              dataSource={port.navires}
              renderItem={(navire) => (
                <List.Item>
                  <Card title={navire.nom} style={{ width: "100%" }}>
                    <p><strong>Matricule:</strong> {navire.matricule}</p>
                  </Card>
                </List.Item>
              )}
            />
          </>
        ) : (
          <p>Aucun navire trouvé.</p>
        )}
      </Card>

      <EditPortDrawer
        open={editVisible}
        onClose={() => setEditVisible(false)}
        port={port}
        onPortUpdated={handlePortUpdated}
      />
    </div>
  );
}

export default PortDetail;
