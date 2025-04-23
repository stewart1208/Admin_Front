"use client";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  BankOutlined,
  GlobalOutlined,
  TeamOutlined,
  ScheduleOutlined,
  CarOutlined,
  DeploymentUnitOutlined
} from "@ant-design/icons";

import { getAll as getAllClients } from "@/Actions/Transport/Client";
import { getAllPorts as getAllPorts } from "@/Actions/Transport/Port";
import { getAllNavires as getAllNavires } from "@/Actions/Transport/Navire";
import { getAll as getAllProprietaires } from "@/Actions/Transport/Proprietaire";
import { getAllLocations as getAllLocations } from "@/Actions/Transport/Location";
import { getAllReservations as getAllReservations } from "@/Actions/Transport/Reservation";

const StatistiquesTransport = () => {
  const [stats, setStats] = useState({
    clients: 0,
    ports: 0,
    navires: 0,
    proprietaires: 0,
    locations: 0,
    reservations: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          clients,
          ports,
          navires,
          proprietaires,
          locations,
          reservations,
        ] = await Promise.all([
          getAllClients(),
          getAllPorts(),
          getAllNavires(),
          getAllProprietaires(),
          getAllLocations(),
          getAllReservations(),
        ]);

        setStats({
          clients: clients.length,
          ports: ports.length,
          navires: navires.length,
          proprietaires: proprietaires.length,
          locations: locations.length,
          reservations: reservations.length,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des stats transport :", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Row gutter={16} justify="center">
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
          <Statistic title="Propriétaires" value={stats.proprietaires} prefix={<TeamOutlined />} />
        </Card>
      </Col>
      <Col span={4}>
        <Card hoverable>
          <Statistic title="Locations" value={stats.locations} prefix={<DeploymentUnitOutlined />} />
        </Card>
      </Col>
      <Col span={4}>
        <Card hoverable>
          <Statistic title="Réservations" value={stats.reservations} prefix={<ScheduleOutlined />} />
        </Card>
      </Col>
    </Row>
  );
};

export default StatistiquesTransport;
