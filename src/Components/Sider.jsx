"use client";
import React from "react";
import { Layout, Menu } from "antd";
import { useRouter } from "next/navigation";
import { HomeOutlined, ApartmentOutlined , MoneyCollectOutlined, BankOutlined, UserSwitchOutlined, RadarChartOutlined , UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";


const { Sider } = Layout;

const SiderMenu = () => {
  const router = useRouter();

  const items = [
    { key: "/", icon: <HomeOutlined />, label: "Home" }, // Accueil
    { key: "/ugp", icon: <ApartmentOutlined  />, label: "UGP" }, // Gestion des utilisateurs/groupes
    { key: "/commission", icon: <MoneyCollectOutlined />, label: "Commissions" }, // Gestion des commissions
    { key: "/port", icon: <BankOutlined />, label: "Ports" }, // Ports maritimes
    { key: "/mandateur", icon: <UserSwitchOutlined />, label: "Mandateurs" }, // Personnes intermédiaires
    { key: "/navire", icon: <RadarChartOutlined  />, label: "Navires" }, // Gestion des navires
    { key: "/client", icon: <UserOutlined />, label: "Clients" }, // Gestion des clients
    { key: "/article", icon: <ShoppingCartOutlined />, label: "Articles" }, // Articles, produits en vente
];;

  // Gestion du clic pour naviguer
  const handleClick = (e) => {
    router.push(e.key);
  };

  return (
    <Sider width={200} style={{ background: "#fff" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["/"]}
        defaultOpenKeys={["/"]}
        style={{ height: "100%", borderRight: 0 }}
        items={items}
        onClick={handleClick} // Ajoute la navigation
      />
    </Sider>
  );
};

export default SiderMenu;
