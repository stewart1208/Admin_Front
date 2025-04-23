"use client";
import React, { useEffect, useState } from "react";
import { Layout, Menu, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { logout } from "../Actions/Auth";

const { Header } = Layout;

const Navbar = () => {
  const [email, setEmail] = useState(null);
  const [currentSection, setCurrentSection] = useState("pecherie");

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      const admin = JSON.parse(adminData);
      setEmail(admin.email);
    }

    const savedSection = localStorage.getItem("currentSection") || "pecherie";
    setCurrentSection(savedSection);
  }, []);

  const handleSectionChange = (key) => {
    setCurrentSection(key);
    localStorage.setItem("currentSection", key);
    window.dispatchEvent(new Event("sectionChange")); // déclenchement du changement
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("admin");
    window.dispatchEvent(new Event("adminLogout"));
    window.location.href = "/login";
  };

  const sectionItems = [
    { key: "pecherie", label: "Pêcherie" },
    { key: "transport", label: "Transport" },
  ];

  return (
    <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {/* Menu des sections */}
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[currentSection]}
        items={sectionItems}
        onClick={({ key }) => handleSectionChange(key)}
        style={{ flex: 1 }}
      />

      {/* Zone d'authentification */}
      {email ? (
        <Dropdown
          menu={{
            items: [{ key: "logout", label: "Se déconnecter", onClick: handleLogout }],
          }}
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
