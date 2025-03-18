"use client";
import React, { useEffect, useState } from "react";
import { Layout, Menu, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { logout } from "../Actions/Auth";

const { Header } = Layout;
const items = ["Pêche", "Transport"].map((label, index) => ({
  key: index + 1,
  label,
}));

const Navbar = () => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const updateNavbar = () => {
      const adminData = localStorage.getItem("admin");
      if (adminData) {
        const admin = JSON.parse(adminData);
        setEmail(admin.email);
      } else {
        setEmail(null);
      }
    };

    updateNavbar();

    // Mise à jour après connexion/déconnexion
    window.addEventListener("adminLogin", updateNavbar);
    window.addEventListener("adminLogout", updateNavbar);
    return () => {
      window.removeEventListener("adminLogin", updateNavbar);
      window.removeEventListener("adminLogout", updateNavbar);
    };
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("admin");
    window.dispatchEvent(new Event("adminLogout")); // Mise à jour des autres composants
    window.location.href = "/login";
  };

  return (
    <Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: 0 }}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} items={items} style={{ flex: 1 }} />
      
      {email ? (
        <Dropdown
          menu={{ items: [{ key: "logout", label: "Se déconnecter", onClick: handleLogout }] }}
        >
          <Button type="text" icon={<UserOutlined />} style={{ color: "white" }}>
            {email}
          </Button>
        </Dropdown>
      ) : (
        <Button type="text" style={{ color: "white" }} onClick={() => (window.location.href = "/login")}>
          Se connecter
        </Button>
      )}
    </Header>
  );
};

export default Navbar;
