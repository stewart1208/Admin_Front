"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getById, valider } from "@/Actions/Transport/Proprietaire";
import { Card, Descriptions, Spin, Alert, Tag, Button, Modal, message } from "antd";

const ProprietaireDetail = () => {
  const { id } = useParams();
  const [proprietaire, setProprietaire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [validating, setValidating] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const data = await getById(id);
      setProprietaire(data);
    } catch (err) {
      setError("Erreur lors du chargement du propriétaire");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDetails();
  }, [id]);

  const handleValidation = async () => {
    try {
      setValidating(true);
      await valider(proprietaire.id);
      message.success("Propriétaire validé !");
      fetchDetails();
    } catch (err) {
      message.error("Erreur lors de la validation.");
    } finally {
      setValidating(false);
      setModalOpen(false);
    }
  };

  if (loading) return <Spin fullscreen />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <>
      <Card title={`Détails du propriétaire ${proprietaire.nom} ${proprietaire.prenom}`}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Téléphone">{proprietaire.numTelephone}</Descriptions.Item>
          <Descriptions.Item label="Date de naissance">
            {new Date(proprietaire.dateDeNassence).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Validé">
            <Tag color={proprietaire.state ? "green" : "red"}>
              {proprietaire.state ? "Oui" : "Non"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Date de création">
            {new Date(proprietaire.create_At).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Navires">
            {proprietaire.navires.length > 0 ? (
              proprietaire.navires.join(", ")
            ) : (
              <i>Aucun navire</i>
            )}
          </Descriptions.Item>
        </Descriptions>

        {!proprietaire.state && (
          <Button type="primary" onClick={() => setModalOpen(true)} style={{ marginTop: 16 }}>
            Valider ce propriétaire
          </Button>
        )}
      </Card>

      <Modal
        title="Confirmation"
        open={modalOpen}
        onOk={handleValidation}
        onCancel={() => setModalOpen(false)}
        confirmLoading={validating}
        okText="Valider"
        cancelText="Annuler"
      >
        <p>Êtes-vous sûr de vouloir valider ce propriétaire ?</p>
      </Modal>
    </>
  );
};

export default ProprietaireDetail;
