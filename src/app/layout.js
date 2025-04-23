"use client";
import React, { useEffect, useState } from "react";
import { Layout, ConfigProvider } from "antd";
import Navbar from "@/Components/NavBar";
import PechSider from "@/Components/Sider/PecheSider";
import TransportSider from "@/Components/Sider/TransportSider";

const { Content, Sider } = Layout;

export default function RootLayout({ children }) {
  const [section, setSection] = useState("pecherie");

  useEffect(() => {
    const current = localStorage.getItem("currentSection") || "pecherie";
    setSection(current);

    const handleSectionChange = () => {
      const updated = localStorage.getItem("currentSection") || "pecherie";
      setSection(updated);
    };

    window.addEventListener("sectionChange", handleSectionChange);
    return () => window.removeEventListener("sectionChange", handleSectionChange);
  }, []);

  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>
        <ConfigProvider>
          <Layout style={{ minHeight: "100vh" }}>
            <Navbar />
            <Layout>
              <Sider width={200} style={{ background: "#fff" }}>
                {section === "pecherie" ? <PechSider /> : <TransportSider />}
              </Sider>
              <Layout style={{ padding: "0 24px 24px" }}>
                <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
                  {children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}
