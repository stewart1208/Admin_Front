"use client";
import { useEffect, useState } from "react";
import { getAll } from "@/Actions/Transport/Proprietaire";
import ProprietaireCard from "@/Components/Transport/Propritaire/ProprietaireCard";
import { Spin, Alert ,List} from "antd";

const ProprietairesList = () => {
  const [proprietaires, setProprietaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAll();
        setProprietaires(data);
      } catch (err) {
        setError("Erreur lors du chargement des propriétaires");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spin fullscreen />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={proprietaires}
            renderItem={(proprietaire) => (
              <List.Item style={{ display: "flex", justifyContent: "center" }}>
              <ProprietaireCard proprietaire={proprietaire}/>
              </List.Item>
            )}
          />
      )}
    </div>
  );
};

export default ProprietairesList;
