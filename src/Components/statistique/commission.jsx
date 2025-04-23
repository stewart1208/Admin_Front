"use client";
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { useRouter } from "next/navigation"; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,LabelList  } from "recharts";
import { getAll } from "../../Actions/Commission"; // Import du service

const CommissionsParUGP = () => {
  const [data, setData] = useState([]);
  const router = useRouter(); 
  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const commissions = await getAll(); // Appel du service
        setData(commissions);
      } catch (error) {
        console.error("Erreur lors de la récupération des commissions :", error);
      }
    };

    fetchCommissions();
  }, []);
  const handleBarClick = (data) => {
    if (data && data.id) {
      router.push(`/commission/${data.id}`); // Redirection vers la page de la commission
    }
  };
  return (
    <Card title="Commissions par UGP">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ugp" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="commission"
            fill="#1890ff"
            onClick={(event) => handleBarClick(event)}
          > 
            {/* Affichage du nom de l'UGP au milieu de la barre */}
            <LabelList dataKey="ugp.dayra" position="center" fill="#fff" fontSize={14} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CommissionsParUGP;
