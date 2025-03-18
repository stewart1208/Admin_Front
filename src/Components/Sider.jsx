"use client";
import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { useRouter } from "next/navigation";
import { 
  HomeOutlined, ApartmentOutlined, MoneyCollectOutlined, BankOutlined, 
  UserSwitchOutlined, RadarChartOutlined, UserOutlined, ShoppingCartOutlined ,AppstoreOutlined 
} from "@ant-design/icons";

const { Sider } = Layout;

const SiderMenu = () => {
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
    { key: "/", icon: <HomeOutlined />, label: "Home" },
    { key: "/ugp", icon: <ApartmentOutlined />, label: "UGP" },
    { key: "/commission", icon: <MoneyCollectOutlined />, label: "Commissions" },
    { key: "/port", icon: <BankOutlined />, label: "Ports" },
    { key: "/mandateur", icon: <UserSwitchOutlined />, label: "Mandateurs" },
    { key: "/navire", icon: <RadarChartOutlined />, label: "Navires" },
    { key: "/client", icon: <UserOutlined />, label: "Clients" },
    { key: "/article", icon: <ShoppingCartOutlined />, label: "Articles" },
    { key: "/production", icon: <AppstoreOutlined  />, label: "Productions" },
  ];

  const handleClick = (e) => {
    router.push(e.key);
  };

  if (!isAuthenticated) {
    return null; // Ne pas afficher le menu si l'utilisateur n'est pas connecté
  }

  return (
    <Sider width={200} style={{ background: "#fff" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["/"]}
        style={{ height: "100%", borderRight: 0 }}
        items={items}
        onClick={handleClick}
      />
    </Sider>
  );
};

export default SiderMenu;
