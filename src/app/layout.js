"use client";
import React from "react";
import { Layout, ConfigProvider } from "antd";
import Navbar from "../Components/NavBar";
import SiderMenu from "../Components/Sider";

const { Content } = Layout;

const MainLayout = ({ children }) => {
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
