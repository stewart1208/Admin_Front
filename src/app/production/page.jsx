"use client";
import { useEffect, useState } from "react";
import { Spin, List } from "antd";
import { getAll } from "../../Actions/Production";
import ProductionCard from "../../Components/production/ProductionCard";

export default function Page() {
  const [productions, setProductions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductions = async () => {
      try {
        const data = await getAll();
        setProductions(data);
      } catch (error) {
        console.error("Erreur lors du chargement des productions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductions();
  }, []);

  return (
    <div>
      <h1>Liste des Productions</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={productions}
          renderItem={(production) => (
            <List.Item>
              <ProductionCard production={production} />
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
