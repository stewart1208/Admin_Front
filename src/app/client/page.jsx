"use client";
import { useEffect, useState } from "react";
import { List, Spin } from "antd";
import { getAll } from "../../Actions/Client";
import ClientCard from "../../Components/client/ClientCard";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getAll();
        setClients(data);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div>
      <h1>📋 Liste des Clients</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={clients}
            renderItem={(client) => (
              <List.Item style={{ display: "flex", justifyContent: "center" }}>
              <ClientCard client={client} />
              </List.Item>
            )}
          />
      )}
    </div>
  );
};

export default ClientsPage;
