"use client";
import React, { useEffect, useState } from "react";
import { getAll } from "../../Actions/Port";
import { List, Spin, Alert } from "antd";
import Link from "next/link";
import PortCard from "../../Components/port/PortCard";
import PortFormDrawer from "../../Components/port/AddPort"; // Import du Drawer

function Port() {
  const [ports, setPorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const data = await getAll();
        setPorts(data);
      } catch (err) {
        setError("Impossible de récupérer les ports.");
      } finally {
        setLoading(false);
      }
    };

    fetchPorts();
  }, []);

  const handlePortAdded = (newPort) => {
    console.log("Ajout du port:", newPort);
    setPorts((prevPorts) => [...prevPorts, newPort]); // Mise à jour de la liste
  };

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Erreur" description={error} type="error" showIcon />;

  return (
    <div style={{ padding: "20px" }}>
      <PortFormDrawer onPortAdded={handlePortAdded} />
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={ports}
        renderItem={(port) => (
          <List.Item>
            <Link href={`/port/${port.id}`}>
              <PortCard port={port} />
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Port;
