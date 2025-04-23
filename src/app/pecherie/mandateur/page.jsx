"use client";
import { useEffect, useState } from "react";
import { List } from "antd";
import Link from "next/link";
import { getAll } from "../../../Actions/Mandateur";
import MandateurCard from "../../../Components/mandateur/MandateurCard";

const MandateursPage = () => {
    const [mandateurs, setMandateurs] = useState([]);
    const [loading, setLoading] = useState(true);
  
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
  
    return (
      <div>
        <h1>Liste des Mandateurs</h1>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={mandateurs}
            renderItem={(mandateur) => (
              <List.Item style={{ display: "flex", justifyContent: "center" }}>
                <Link href={`/pecherie/mandateur/${mandateur.id}`} style={{ width: "100%" }}>
                  <MandateurCard mandateur={mandateur} />
                </Link>
              </List.Item>
            )}
          />
        )}
      </div>
    );
  };
  
export default MandateursPage;
