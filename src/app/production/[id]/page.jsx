"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, Spin, Progress, Typography } from "antd";
import { motion } from "framer-motion";

import { getById } from "../../../Actions/Production";
import NavireSimpleCard from "@/Components/navire/navireSimpleCard";
import UgpCard from "@/Components/ugp/ugpCard";

const { Title, Text } = Typography;

const ProductionDetails = () => {
  const { id } = useParams();
  const [production, setProduction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduction = async () => {
        try {
          const data = await getById(id);
          setProduction(data);
        } catch (error) {
          console.error("Erreur lors de la récupération de la production:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduction();
    }
  }, [id]);

  if (loading) {
    return <Spin size="large" style={{ display: "flex", justifyContent: "center", marginTop: 50 }} />;
  }

  if (!production) {
    return <p>Aucune production trouvée.</p>;
  }

  const etatStyle = {
    color: production.etat ? "green" : "red",
    fontWeight: "bold",
  };

  const percentage = (production.montant / production.totale) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: "90%", margin: "20px auto" }}
    >
      <Title level={2} style={{ textAlign: "center" }}>Détails de la Production</Title>
      <Card title={`Navire : ${production.navire.nom}`} >
        <Text strong>Montant :</Text>
        <Progress percent={percentage} status={percentage >= 100 ? "success" : "active"} />
        <p><Text strong>Montant:</Text> {production.montant} DA</p>
        <p><Text strong>Totale:</Text> {production.totale} DA</p>
        <p><Text strong>Semestre:</Text> {production.semestre}</p>
        <p><Text strong>État:</Text> <span style={etatStyle}>{production.etat ? "Réglé" : "Non Réglé"}</span></p>
        
        <Title level={3}>UGP</Title>
        <UgpCard ugp={production.ugp} />
        
        <Title level={3}>Navire</Title>
        <NavireSimpleCard navire={production.navire} />
      </Card>
    </motion.div>
  );
};

export default ProductionDetails;
