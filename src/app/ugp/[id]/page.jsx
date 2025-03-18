"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { List, Spin, Alert, Typography, Card, Tag, message, Button } from "antd";
import getById from "../../../Actions/Ugp";
import { bloqueUgp, debloqueUgp } from "../../../Actions/Ugp";
import PortCard from "@/Components/port/PortCard";
import AddPort from "../../../Components/ugp/AddPort";

const { Title, Text } = Typography;

const UgpComponent = () => {
  const { id } = useParams();
  const [ugp, setUgp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false); // Pour gérer le chargement du bouton

  // Fonction pour rafraîchir les données de l'UGP
  const fetchUgp = async () => {
    setLoading(true);
    try {
      const data = await getById(id);
      setUgp(data);
    } catch (err) {
      setError("Impossible de récupérer l'UGP.");
      message.error("Erreur lors de la récupération de l'UGP.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUgp();
    }
  }, [id]);

  // Fonction pour bloquer/débloquer l'UGP
  const handleToggleState = async () => {
    if (!ugp) return;
    
    setUpdating(true);
    try {
      if (ugp.state) {
        await bloqueUgp(id);
        message.success("UGP bloquée avec succès !");
      } else {
        await debloqueUgp(id);
        message.success("UGP débloquée avec succès !");
      }
      fetchUgp(); // Rafraîchir les données
    } catch (error) {
      message.error("Échec du changement d'état !");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return <Spin size="large" style={{ display: "block", margin: "20px auto" }} />;
  if (error) return <Alert message="Erreur" description={error} type="error" showIcon />;
  if (!ugp) return <Text type="warning">Aucune UGP trouvée.</Text>;

  return (
    <Card title="Détails de l'UGP" style={{ maxWidth: 1200, margin: "20px auto" }}>
      <Title level={4}>
        {ugp.dayra}, {ugp.wilaya}
      </Title>
      <p>
        <strong>Email:</strong> {ugp.email}
      </p>
      <p>
        <strong>Commission:</strong> {ugp.commission * 100}%
      </p>
      <p>
        <strong>État:</strong>{" "}
        {ugp.state ? <Tag color="green">Actif</Tag> : <Tag color="red">Bloquer</Tag>}
      </p>
      <p>
        <strong>Créé le:</strong>{" "}
        {new Date(ugp.create_At).toLocaleDateString()}
      </p>

      {/* Bouton Bloquer / Débloquer */}
      <Button
  type="primary"
  danger={ugp.state} 
  onClick={handleToggleState}
  loading={updating}
  style={{ marginBottom: 20 }}
>
  {ugp.state ? "Bloquer" : "Débloquer"}
</Button>


      {/* Composant pour ajouter un port à l'UGP */}
      <AddPort onSuccess={fetchUgp} ugp={ugp} />

      {/* Liste des ports associés */}
      <Title level={5} style={{ marginTop: 20 }}>
        Ports associés :
      </Title>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={ugp.ports}
        renderItem={(port) => (
          <List.Item style={{ display: "flex", justifyContent: "center" }}>
              <PortCard port={port} />
          </List.Item>          
        )}
      />

      <Title level={5} style={{ marginTop: 20 }}>
        Commissions :
      </Title>
      {/*<List
        grid={{ gutter: 16, column: 3 }}
        dataSource={ugp.commissions}
        renderItem={(commission) => (
          <List.Item style={{ display: "flex", justifyContent: "center" }}>
            <h1>${commission}</h1>
          </List.Item>          
        )}
      />*/}
    </Card>
  );
};

export default UgpComponent;
