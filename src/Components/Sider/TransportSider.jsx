"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useRouter } from "next/navigation";
import {
  DashboardOutlined,
  RadarChartOutlined ,
  UserOutlined,
  BankOutlined,
  HomeOutlined,
  ScheduleOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const TransportSider = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const checkAuth = () => {
        setIsAuthenticated(!!localStorage.getItem("admin"));
      };
  
      checkAuth();
  
      // Écoute les événements de connexion et déconnexion
      window.addEventListener("adminLogin", checkAuth);
      window.addEventListener("adminLogout", checkAuth);
      
      return () => {
        window.removeEventListener("adminLogin", checkAuth);
        window.removeEventListener("adminLogout", checkAuth);
      };
    }, []);

  const items = [
    { key: "/transport", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "/transport/navire", icon: <RadarChartOutlined />, label: "Navires" },
  { key: "/transport/client", icon: <TeamOutlined />, label: "Clients" },
  { key: "/transport/port", icon: <HomeOutlined />, label: "Ports" },
  { key: "/transport/proprietaire", icon: <UserOutlined />, label: "Propriétaires" },
  { key: "/transport/location", icon: <BankOutlined />, label: "Locations" },
  { key: "/transport/reservation", icon: <ScheduleOutlined />, label: "Réservations" },
  ];
  if (!isAuthenticated) {
    return null; // Ne pas afficher le menu si l'utilisateur n'est pas connecté
  }
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["/transport/navire"]}
      style={{ height: "100%", borderRight: 0 }}
      items={items}
      onClick={(e) => router.push(e.key)}
    />
  );
};

export default TransportSider;
