"use client";
import React from "react";
import { Layout } from "antd";
import StatistiquesGenerales from "../../Components/statistique/Generales";
import CommissionsParUGP from "../../Components/statistique/commission";

const { Content } = Layout;

const Dashboard = () => {
  return (
    <Content style={{ padding: 0, margin: 0 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <StatistiquesGenerales />
        <CommissionsParUGP />
      </div>
    </Content>
  );
};

export default Dashboard;
