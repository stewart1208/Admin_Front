"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, Spin, Typography, Button, Modal } from "antd";
import { motion } from "framer-motion";
import { getById, updateState } from "@/Actions/Commission";
import UgpCard from "@/Components/ugp/ugpCard";
import ProductionCard from "@/Components/production/ProductionSimple";

const { Title, Text } = Typography;

const CommissionDetail = () => {
  const { id } = useParams();
  const [commission, setCommission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCommission = async () => {
      try {
        const data = await getById(id);
        setCommission(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la commission :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommission();
  }, [id]);

  // Fonction pour ouvrir le Modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour confirmer le changement d'état
  const handleOk = async () => {
    if (!commission) return;
    setUpdating(true);
    try {
      const newState = !commission.etat;
      const updatedCommission = await updateState(commission.id, newState);
      setCommission(updatedCommission);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'état :", error);
    } finally {
      setUpdating(false);
      setIsModalOpen(false); // Fermer le modal après la mise à jour
    }
  };

  // Fonction pour annuler l'action
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <Spin size="large" style={{ display: "flex", justifyContent: "center", marginTop: 50 }} />;
  }

  if (!commission) {
    return <p>Aucune commission trouvée.</p>;
  }

  return (
    <div style={{ maxWidth: "100%", margin: "20px auto" }}>
      <Card title={commission?.ugp?.dayra || "Nom indisponible"}>
        <p><Text strong>Semestre :</Text> {commission.semestre}</p>
        <p><Text strong>Commission :</Text> {commission.commission} DA</p>

        <p>
          <Text strong>État :</Text>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              borderRadius: "10px",
              fontWeight: "bold",
              color: "white",
              backgroundColor: commission.etat ? "green" : "red",
              display: "inline-block"
            }}
          >
            {commission.etat ? "Réglé" : "Non-Réglé"}
          </motion.span>
        </p>

        {/* Bouton pour ouvrir la boîte de confirmation */}
        <Button
          type="primary"
          loading={updating}
          onClick={showModal}
          style={{ marginTop: "10px", backgroundColor: commission.etat ? "red" : "green", borderColor: commission.etat ? "red" : "green" }}
        >
          {commission.etat ? "Non-Payé" : "Payé"}
        </Button>

        {/* Modal de confirmation */}
        <Modal
          title="Confirmation"
          open={isModalOpen} // ✅ Remplace "visible" par "open"
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={updating}
          okText="Confirmer"
          cancelText="Annuler"
        >
          <p>Voulez-vous vraiment changer l'état de cette commission ?</p>
        </Modal>

        <Title level={3}>UGP</Title>
{commission.ugp ? (
  <UgpCard ugp={commission.ugp} />
) : (
  <p>Aucune UGP associée.</p>
)}


        <Title level={3}>Productions</Title>
        <div style={{ display: "flex", gap: "16px", overflowX: "auto", padding: "10px" }}>
          {commission.productions && commission.productions.length > 0 ? (
            commission.productions.map((production, index) => (
              <ProductionCard key={`${production.id}-${index}`} production={production} />
            ))
          ) : (
            <p>Aucune production associée.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CommissionDetail;
