"use client";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic } from "antd";
import { UserSwitchOutlined, UserOutlined, BankOutlined, ApartmentOutlined, GlobalOutlined } from "@ant-design/icons";
import { getAll as getAllClients } from "../../Actions/Client";
import { getAll as getAllMandateurs } from "../../Actions/Mandateur";
import { getAll as getAllPorts } from "../../Actions/Port";
import { getAll as getAllNavires } from "@/Actions/Navire";
import { getAllUgp } from "../../Actions/Ugp";

const StatistiquesGenerales = () => {
  const [stats, setStats] = useState({ mandateurs: 0, clients: 0, ports: 0, ugps: 0, navires: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clients, mandateurs, ports, ugps, navires] = await Promise.all([
          getAllClients(),
          getAllMandateurs(),
          getAllPorts(),
          getAllUgp(),
          getAllNavires()
        ]);
        setStats({
          mandateurs: mandateurs.length,
          clients: clients.length,
          ports: ports.length,
          ugps: ugps.length,
          navires: navires.length
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques :", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Row gutter={16} justify="center">
      <Col span={4}>
        <Card hoverable>
          <Statistic title="Mandateurs" value={stats.mandateurs} prefix={<UserSwitchOutlined />} />
        </Card>
      </Col>
      <Col span={4}>
        <Card hoverable>
          <Statistic title="Clients" value={stats.clients} prefix={<UserOutlined />} />
        </Card>
      </Col>
      <Col span={4}>
        <Card hoverable>
          <Statistic title="Ports" value={stats.ports} prefix={<BankOutlined />} />
        </Card>
      </Col>
      <Col span={4}>
        <Card hoverable>
          <Statistic title="Navires" value={stats.navires} prefix={<GlobalOutlined />} />
        </Card>
      </Col>
      <Col span={4}>
        <Card hoverable>
          <Statistic title="UGPs" value={stats.ugps} prefix={<ApartmentOutlined />} />
        </Card>
      </Col>
    </Row>
  );
};

export default StatistiquesGenerales;
