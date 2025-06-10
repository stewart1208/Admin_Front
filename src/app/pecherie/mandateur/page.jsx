"use client";
import { useEffect, useState } from "react";
import { Table } from "antd";
import { useRouter } from "next/navigation";
import { getAll } from "../../../Actions/Mandateur";

const MandateursPage = () => {
  const [mandateurs, setMandateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMandateurs = async () => {
      try {
        const data = await getAll();
        setMandateurs(data);
      } catch (error) {
        console.error("Erreur lors du chargement des mandateurs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMandateurs();
  }, []);

  const columns = [
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom",
    },
    {
      title: "Téléphone",
      dataIndex: "numTelephone",
      key: "numTelephone",
    },

  ];

  return (
    <div>
      <h1>Liste des Mandateurs</h1>
      <Table
        columns={columns}
        dataSource={mandateurs}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        // REND LA LIGNE CLIQUABLE
        onRow={(record) => ({
          onClick: () => router.push(`/pecherie/mandateur/${record.id}`),
          style: { cursor: "pointer" },
        })}
      />
    </div>
  );
};

export default MandateursPage;
