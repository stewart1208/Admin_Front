"use client";
import React, { useEffect, useState } from "react";
import { getAllUgp } from "../../Actions/Ugp";
import { List, Spin, Alert, Row, Col } from "antd";
import Link from "next/link";
import UgpCard from "../../Components/ugp/ugpCard";
import AddUGP from "../../Components/ugp/AddUGP"; // ✅ Importation du composant AddUGP

const UgpList = () => {
  const [ugps, setUgps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllUgp();
      setUgps(data);
    } catch (err) {
      setError("Erreur lors du chargement des UGP");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Spin size="large" style={{ display: "block", margin: "20px auto" }} />;
  if (error) return <Alert message="Erreur" description={error} type="error" showIcon />;

  return (
    <div style={{ padding: "20px" }}>
      {/* ✅ Bouton Ajouter UGP */}
      <Row justify="end" style={{ marginBottom: "20px" }}>
        <Col>
          <AddUGP onSuccess={fetchData} /> {/* ✅ Rafraîchit la liste après ajout */}
        </Col>
      </Row>

      {/* ✅ Affichage de la liste des UGP */}
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={ugps}
        renderItem={(ugp) => (
          <List.Item style={{ display: "flex", justifyContent: "center" }}>
              <UgpCard ugp={ugp} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default UgpList;
