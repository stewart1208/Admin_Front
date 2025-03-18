"use client";
import React from "react";
import { Layout } from "antd";
import StatistiquesGenerales from "../Components/statistique/Generales";
import CommissionsParUGP from "../Components/statistique/commission";

const { Content } = Layout;

const Dashboard = () => {
  return (
    <Content style={{ padding: 24 }}>
      <StatistiquesGenerales />
      <CommissionsParUGP style={{ marginTop: 24 }} />
    </Content>
  );
};

export default Dashboard;
