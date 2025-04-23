"use client";
import { useEffect, useState } from "react";
import { getAll } from "@/Actions/Transport/Client";
import ClientCard from "@/Components/Transport/Client/ClientCard";
import { Spin, Alert, List } from "antd";

const ClientListe = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getAll();
        setClients(data);
      } catch (err) {
        setError("Erreur lors du chargement des clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <Spin fullscreen />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div style={{ padding: 20 }}>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={clients}
        renderItem={(client) => (
          <List.Item style={{ display: "flex", justifyContent: "center" }}>
            <ClientCard client={client} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ClientListe;
