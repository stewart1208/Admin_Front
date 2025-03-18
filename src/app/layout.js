"use client";
import React, { useEffect, useState } from "react";
import { Layout, ConfigProvider } from "antd";
import { useRouter } from "next/navigation";
import Navbar from "../Components/NavBar";
import SiderMenu from "../Components/Sider";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const admin = localStorage.getItem("admin");
      if (!admin) {
        router.push("/login"); // Redirection automatique si pas connecté
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();

    window.addEventListener("adminLogin", checkAuth);
    window.addEventListener("adminLogout", checkAuth);

    return () => {
      window.removeEventListener("adminLogin", checkAuth);
      window.removeEventListener("adminLogout", checkAuth);
    };
  }, [router]);
  return (
    <html lang="fr">
      <body style={{margin:0}}>
        <ConfigProvider style={{margin:0}}>
          <Layout style={{ minHeight: "100vh" }}>
            <Navbar />
            <Layout>
              <SiderMenu />
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
};

export default MainLayout;
