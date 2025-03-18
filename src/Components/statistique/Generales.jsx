"use client";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic } from "antd";
import { UserSwitchOutlined, UserOutlined, BankOutlined, ApartmentOutlined } from "@ant-design/icons";
import { getAll as getAllClients } from "../../Actions/Client";
import { getAll as getAllMandateurs } from "../../Actions/Mandateur";
import { getAll as getAllPorts } from "../../Actions/Port";
import { getAllUgp } from "../../Actions/Ugp";

const StatistiquesGenerales = () => {
  const [stats, setStats] = useState({ mandateurs: 0, clients: 0, ports: 0, ugps: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clients, mandateurs, ports, ugps] = await Promise.all([
          getAllClients(),
          getAllMandateurs(),
          getAllPorts(),
          getAllUgp()
        ]);
        setStats({
          mandateurs: mandateurs.length,
          clients: clients.length,
          ports: ports.length,
          ugps: ugps.length,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques :", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card>
          <Statistic title="Mandateurs" value={stats.mandateurs} prefix={<UserSwitchOutlined />} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="Clients" value={stats.clients} prefix={<UserOutlined />} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="Ports" value={stats.ports} prefix={<BankOutlined />} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="UGPs" value={stats.ugps} prefix={<ApartmentOutlined />} />
        </Card>
      </Col>
    </Row>
  );
};

export default StatistiquesGenerales;
