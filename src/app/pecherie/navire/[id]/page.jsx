"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, Spin } from "antd";
import { getById } from "../../../../Actions/Navire";
import PortCard from "@/Components/port/PortCard";
import MandateurCard from "@/Components/mandateur/MandateurSimpleCard";

const NavireDetails = () => {
  const { id } = useParams();
  const [navire, setNavire] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchNavire = async () => {
        try {
          const data = await getById(id);
          setNavire(data);
        } catch (error) {
          console.error("Erreur lors de la récupération du navire:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchNavire();
    }
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!navire) {
    return <p>Aucun navire trouvé.</p>;
  }

  return (
    <div style={{ maxWidth: "100%", margin: "20px auto" }}>
      <Card title={`🚢 ${navire.nom}`}>
        <p><strong>Matricule:</strong> {navire.matricule}</p>
        <p><strong>Propriétaire:</strong> {navire.proprietaire}</p>
        <p><strong>Commission:</strong> {navire.commission * 100}%</p>
        <p><strong>Créé le:</strong> {new Date(navire.create_At).toLocaleDateString()}</p>

        <h3>📍 Port d'attache</h3>
        <PortCard port={navire.port}/>

        <h3>👤 Mandateur</h3>
        <MandateurCard mandateur={navire.mandateur}/>
      </Card>
    </div>
  );
};

export default NavireDetails;
