"use client";
import { useEffect, useState } from "react";
import { Spin,List } from "antd";
import { getAll } from "../../Actions/Navire";
import NavireCard from "../../Components/navire/navireCard";

const NaviresPage = () => {
  const [navires, setNavires] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNavires = async () => {
      try {
        const data = await getAll();
        setNavires(data);
      } catch (error) {
        console.error("Erreur lors du chargement des navires:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNavires();
  }, []);

  return (
    <div>
      <h1>Liste des Navires</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={navires}
        renderItem={(navire) => (
          <List.Item>
              <NavireCard navire={navire} />
        </List.Item>
        )}
      />
      )}
    </div>
  );
};

export default NaviresPage;
