"use client";

import { useEffect, useState } from "react";
import { getAll } from "@/Actions/Commission";
import { Card, Spin, Row, Col, Typography } from "antd";
import CommissionCard from "@/Components/commission/CommissionCard";

const { Title } = Typography;

const Commission = () => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const data = await getAll();
        setCommissions(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des commissions :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommissions();
  }, []);

  if (loading) {
    return <Spin size="large" style={{ display: "flex", justifyContent: "center", marginTop: 50 }} />;
  }

  return (
    <div style={{ maxWidth: "90%", margin: "20px auto" }}>
      <Title level={2} style={{ textAlign: "center" }}>Liste des Commissions</Title>
      <Row gutter={[16, 16]}>
        {commissions.map((commission) => (
          <Col key={commission.id} xs={24} sm={12} md={8} lg={6}>
            <CommissionCard commission={commission} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Commission;